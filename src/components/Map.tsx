import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { Coordinate } from 'interfaces';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL } from '@env';

type Props = {
  centerCoordinate: Coordinate;
  zoomLevel: number;
  pitch: number;
  children: any;
  onRegionWillChange?: () => void;
  onRegionDidChange?: () => void;
};

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const ANIMATION_DURATION = 1200;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Map: FC<Props> = ({
  centerCoordinate,
  zoomLevel,
  pitch,
  onRegionWillChange,
  onRegionDidChange,
  children,
}) => {
  return (
    <MapboxGL.MapView
      styleURL={MAPBOX_STYLE_URL || MapboxGL.StyleURL.Dark}
      pitchEnabled={true}
      logoEnabled={false}
      compassEnabled={true}
      onRegionWillChange={onRegionWillChange}
      onRegionDidChange={onRegionDidChange}
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
