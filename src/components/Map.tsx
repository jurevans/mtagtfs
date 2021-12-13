import React, { FC } from 'react';
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
const styleURL = 'mapbox://styles/jurevans/ckx09yl8v07tm14rupxmhhz3o';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Map: FC<Props> = ({ centerCoordinate, zoomLevel, pitch, children }) => {
  return (
    <MapboxGL.MapView
      styleURL={styleURL}
      pitchEnabled={true}
      logoEnabled={false}
      compassEnabled={true}
      style={styles.map}>
      <MapboxGL.Camera
        zoomLevel={zoomLevel}
        centerCoordinate={centerCoordinate}
        pitch={pitch}
        animationMode={'flyTo'}
        animationDuration={ANIMATION_DURATION}
      />
      {children}
    </MapboxGL.MapView>
  );
};

export default Map;
