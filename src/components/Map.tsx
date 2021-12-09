import React, { FC, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { Coordinate } from 'interfaces';
import { MAPBOX_ACCESS_TOKEN } from '@env';

type Props = {
  centerCoordinate: Coordinate;
  zoomLevel: number;
  pitch: number;
  children: any;
};

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const ANIMATION_DURATION = 1500;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Map: FC<Props> = ({ centerCoordinate, zoomLevel, pitch, children }) => {
  const mapViewRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  return (
    <MapboxGL.MapView
      styleURL={MapboxGL.StyleURL.Dark}
      pitchEnabled={true}
      logoEnabled={false}
      compassEnabled={true}
      style={styles.map}
      ref={mapViewRef}>
      <MapboxGL.Camera
        zoomLevel={zoomLevel}
        centerCoordinate={centerCoordinate}
        ref={cameraRef}
        pitch={pitch}
        animationMode={'flyTo'}
        animationDuration={ANIMATION_DURATION}
      />
      {children}
    </MapboxGL.MapView>
  );
};

export default Map;
