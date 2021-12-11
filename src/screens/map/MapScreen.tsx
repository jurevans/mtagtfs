import React, { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Map from 'components/Map';
import TripShape from 'components/TripShape';
import StopMarker from 'components/StopMarker';
import Stop from 'components/Stop';
import { setActiveStop } from 'slices/stops';
import { GET_SHAPE, GET_TRIP } from 'apollo/queries';
import { ROUTE_FIELDS, STOP_FIELDS } from 'apollo/fragments';
import {
  Coordinate,
  IRoute,
  IShape,
  IStop,
  IStopTime,
  ITrip,
} from 'interfaces';
import styles from './styles';

const DEFAULT_COORD: Coordinate = [-73.94594865587045, 40.7227534777328];
const DEFAULT_ZOOM = 11;
const STOP_ZOOM = 15;
const ANIMATION_DURATION = 1500;

interface ShapeVars {
  shapeId: string;
}

const MapScreen: FC = () => {
  const { activeStop } = useAppSelector(state => state.stops);
  const { activeTrip } = useAppSelector(state => state.trips);
  const dispatch = useAppDispatch();
  const client = useApolloClient();

  const [isMarkerVisible, setMarkerVisible] = useState(true);
  const [cameraState, setCameraState] = useState({
    zoomLevel: DEFAULT_ZOOM,
    centerCoordinate: DEFAULT_COORD,
    pitch: 50,
  });

  const { zoomLevel, centerCoordinate, pitch } = cameraState;
  const { loading, data } = useQuery<{ shape: IShape }, ShapeVars>(GET_SHAPE, {
    variables: {
      shapeId: activeTrip?.shapeId || '',
    },
  });

  const onStopPress = useCallback(
    (feedIndex: number, stopId: string) => {
      setMarkerVisible(false);
      setTimeout(() => setMarkerVisible(true), ANIMATION_DURATION);
      dispatch(
        setActiveStop({
          feedIndex: feedIndex,
          stopId: stopId,
        }),
      );
    },
    [dispatch],
  );

  // Retrieve active trip from cache
  const tripInCache = client.readQuery<{ nextTrip: ITrip }>({
    query: GET_TRIP,
    variables: {
      feedIndex: activeTrip?.feedIndex,
      routeId: activeTrip?.routeId,
    },
  });
  const trip: ITrip | undefined = tripInCache?.nextTrip;

  // Retrieve active stop fragment from cache
  const stop: IStop | null = client.readFragment({
    id: `Stop:${activeStop?.feedIndex}:${activeStop?.stopId}`,
    fragment: gql`
      ${STOP_FIELDS}
    `,
  });

  // Retrieve active route fragment from cache
  const route: IRoute | null = client.readFragment({
    id: `Route:${activeTrip?.feedIndex}:${activeTrip?.routeId}`,
    fragment: gql`
      ${ROUTE_FIELDS}
    `,
  });

  useEffect(() => {
    if (stop) {
      setCameraState(state => ({
        ...state,
        centerCoordinate: stop?.geom.coordinates || DEFAULT_COORD,
        zoomLevel: STOP_ZOOM,
      }));
    }
  }, [stop]);

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
                feedIndex={st.stop.feedIndex}
                stopId={st.stop.stopId}
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
