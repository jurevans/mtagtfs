import React, { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Map from 'components/Map';
import TripShape from 'components/TripShape';
import StopMarker from 'components/StopMarker';
import Stop from 'components/Stop';
import { setActiveStop } from 'slices/stops';
import { GET_SHAPE } from 'apollo/queries';
import { ROUTE_FIELDS, STOP_FIELDS, TRIP_FIELDS } from 'apollo/fragments';
import {
  Coordinate,
  IRoute,
  IShape,
  IStop,
  IStopTime,
  ITrip,
} from 'interfaces';
import styles from './styles';
import { StopTimeCallback } from 'components/StopTime';

const DEFAULT_COORD: Coordinate = [-73.94594865587045, 40.7227534777328];
const DEFAULT_ZOOM = 11;
const STOP_ZOOM = 15;
const ANIMATION_DURATION = 1500;

interface ShapeVars {
  shapeId: string;
}

const MapScreen: FC = () => {
  const { activeStop } = useAppSelector(state => state.stops);
  const dispatch = useAppDispatch();
  const client = useApolloClient();

  const [isMarkerVisible, setMarkerVisible] = useState(true);
  const [cameraState, setCameraState] = useState({
    zoomLevel: DEFAULT_ZOOM,
    centerCoordinate: DEFAULT_COORD,
    pitch: 50,
  });

  const { zoomLevel, centerCoordinate, pitch } = cameraState;

  // Retrieve trip fragment from cache
  const trip: ITrip | null = client.readFragment({
    id: `Trip:${activeStop?.feedIndex}:${activeStop?.tripId}`,
    fragment: gql`
      ${TRIP_FIELDS}
    `,
  });

  // Query shape geometries
  const { loading, data } = useQuery<{ shape: IShape }, ShapeVars>(GET_SHAPE, {
    variables: {
      shapeId: trip?.shapeId || '',
    },
  });

  // Retrieve active stop fragment from cache
  const stop: IStop | null = client.readFragment({
    id: `Stop:${activeStop?.feedIndex}:${activeStop?.stopId}`,
    fragment: gql`
      ${STOP_FIELDS}
    `,
  });

  // Retrieve route fragment from cache
  const route: IRoute | null = client.readFragment({
    id: `Route:${activeStop?.feedIndex}:${trip?.routeId}`,
    fragment: gql`
      ${ROUTE_FIELDS}
    `,
  });

  const onStopPress = useCallback<StopTimeCallback>(
    ({ stopId, tripId, feedIndex }) => {
      dispatch(
        setActiveStop({
          feedIndex: feedIndex,
          tripId: tripId,
          stopId: stopId,
        }),
      );
      setMarkerVisible(false);
      setTimeout(() => setMarkerVisible(true), ANIMATION_DURATION);
    },
    [dispatch],
  );

  useEffect(() => {
    setCameraState(state => ({
      ...state,
      centerCoordinate: stop?.geom.coordinates || DEFAULT_COORD,
      zoomLevel: STOP_ZOOM,
    }));
  }, [stop?.geom.coordinates]);

  const shapeLayerId = `line-layer-${trip?.feedIndex}:${trip?.tripId}`;

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Map
          centerCoordinate={centerCoordinate}
          zoomLevel={zoomLevel}
          pitch={pitch}>
          {stop?.geom && isMarkerVisible && (
            <StopMarker
              feedIndex={stop.feedIndex}
              stopId={stop.stopId}
              coordinates={stop.geom.coordinates}
            />
          )}
          {!loading && (data || trip?.stopTimes) && (
            <TripShape
              shapeSourceId={`shape-source-${trip?.feedIndex}:${trip?.tripId}`}
              layerId={shapeLayerId}
              color={route?.routeColor}
              coordinates={
                data?.shape.geom.coordinates ||
                trip?.stopTimes.map(st => st.stop.geom.coordinates)
              }
            />
          )}
          {trip?.stopTimes &&
            trip?.stopTimes.map((st: IStopTime) => (
              <Stop
                key={st.stop.stopId}
                feedIndex={trip.feedIndex}
                stopId={st.stop.stopId}
                tripId={trip.tripId}
                coordinates={st.stop.geom.coordinates}
                color={route?.routeColor}
                isActive={st.stop?.stopId === stop?.stopId}
                aboveLayerId={shapeLayerId}
                onPress={onStopPress}
              />
            ))}
        </Map>
      </View>
    </View>
  );
};

export default MapScreen;
