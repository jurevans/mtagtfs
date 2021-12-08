import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IShape, IStopTime } from 'interfaces';
import styles from './styles';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import TripShape from 'components/TripShape';
import StopMarker from 'components/StopMarker';
import { GET_TRIP } from 'screens/route/RouteScreen';
import Stop from 'components/Stop';
import { setActiveStop } from 'slices/stops';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const DEFAULT_COORD = [-73.94594865587045, 40.7227534777328];
const DEFAULT_ZOOM = 11;
const STOP_ZOOM = 15;
const ANIMATION_DURATION = 2000;

interface ShapeVars {
  shapeId: string;
}

const GET_SHAPE = gql`
  query GetShape($shapeId: String!) {
    shape(shapeId: $shapeId) {
      shapeId
      length
      geom {
        type
        coordinates
      }
    }
  }
`;

const MapScreen: FC = () => {
  const mapViewRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);
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

  const goToStop = useCallback(
    stop => {
      setMarkerVisible(false);
      setTimeout(() => setMarkerVisible(true), ANIMATION_DURATION);
      dispatch(
        setActiveStop({
          stopId: stop.stopId,
          stopName: stop.stopName,
          coordinates: stop.geom.coordinates,
        }),
      );
    },
    [dispatch],
  );

  const tripInCache = client.readQuery({
    query: GET_TRIP,
    variables: {
      feedIndex: activeTrip?.feedIndex,
      routeId: activeTrip?.routeId,
    },
  });

  const { nextTrip: trip } = tripInCache || {};
  const { stopTimes } = trip || {};

  useEffect(() => {
    if (activeStop) {
      setCameraState(state => ({
        ...state,
        centerCoordinate: activeStop?.coordinates || DEFAULT_COORD,
        zoomLevel: STOP_ZOOM,
      }));
    }
  }, [activeStop]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Dark}
          pitchEnabled={true}
          logoEnabled={false}
          compassEnabled={true}
          ref={mapViewRef}>
          <MapboxGL.Camera
            zoomLevel={zoomLevel}
            centerCoordinate={centerCoordinate}
            ref={cameraRef}
            pitch={pitch}
            animationMode={'flyTo'}
            animationDuration={ANIMATION_DURATION}
          />
          {activeStop && isMarkerVisible && <StopMarker stop={activeStop} />}
          {data && <TripShape trip={trip} shape={data.shape} />}
          {stopTimes &&
            stopTimes.map((stopTime: IStopTime) => (
              <Stop
                key={`stop-time-${stopTime.stop.stopId}`}
                stopTime={stopTime}
                color={trip?.route.routeColor}
                shapeId={trip?.shapeId}
                goToStop={goToStop}
              />
            ))}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default MapScreen;
