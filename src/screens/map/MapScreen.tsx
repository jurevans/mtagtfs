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
  const { data } = useQuery<{ shape: IShape }, ShapeVars>(GET_SHAPE, {
    variables: {
      shapeId: activeTrip?.shapeId || '',
    },
  });

  const onStopPress = useCallback(
    (stop: IStop) => {
      setMarkerVisible(false);
      setTimeout(() => setMarkerVisible(true), ANIMATION_DURATION);
      dispatch(
        setActiveStop({
          feedIndex: stop.feedIndex,
          stopId: stop.stopId,
        }),
      );
    },
    [dispatch],
  );

  // Retrieve active trip from cache
  const tripInCache = client.readQuery({
    query: GET_TRIP,
    variables: {
      feedIndex: activeTrip?.feedIndex,
      routeId: activeTrip?.routeId,
    },
  });
  const trip: ITrip = tripInCache?.nextTrip;

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

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Map
          centerCoordinate={centerCoordinate}
          zoomLevel={zoomLevel}
          pitch={pitch}>
          {stop?.geom && isMarkerVisible && <StopMarker stop={stop} />}
          {data && <TripShape route={route} shape={data.shape} />}
          {trip?.stopTimes &&
            trip?.stopTimes.map((st: IStopTime) => (
              <Stop
                key={`stop-time-${st.stop.stopId}`}
                stop={st.stop}
                color={route?.routeColor}
                isActive={st.stop?.stopId === stop?.stopId}
                aboveLayerID={`line-layer-${trip.shapeId}`}
                onPress={onStopPress}
              />
            ))}
        </Map>
      </View>
    </View>
  );
};

export default MapScreen;
