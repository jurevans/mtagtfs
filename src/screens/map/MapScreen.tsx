import React, { FC, useEffect, useRef, useState } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useAppSelector } from 'store/hooks';
import { Shape } from 'interfaces';
import styles from './styles';
import { MAPBOX_ACCESS_TOKEN } from '@env';
import TripShape from 'components/TripShape';
import StopMarker from 'components/StopMarker';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const DEFAULT_COORD = [-73.94594865587045, 40.7227534777328];
const DEFAULT_ZOOM = 11;
const STOP_ZOOM = 15;

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

  const [cameraState, setCameraState] = useState({
    zoomLevel: DEFAULT_ZOOM,
    centerCoordinate: DEFAULT_COORD,
    pitch: 50,
  });

  const { zoomLevel, centerCoordinate, pitch } = cameraState;

  const { data } = useQuery<{ shape: Shape }, ShapeVars>(GET_SHAPE, {
    variables: {
      shapeId: activeTrip?.shapeId || '',
    },
  });

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
          />
          {activeStop && <StopMarker stop={activeStop} />}
          {/*
            TODO: Shape service in API should return GeoJSON,
            as well as generate line geometry for missing shapes
            based on stop locations:
          */}
          {data && <TripShape trip={activeTrip} shape={data.shape} />}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default MapScreen;
