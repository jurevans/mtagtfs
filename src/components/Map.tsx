import React, { FC } from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import MapboxGL, { RegionPayload } from '@react-native-mapbox-gl/maps';
import { Feature, Point, Position } from '@turf/helpers';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL } from '@env';

type Props = {
  centerCoordinate: Position;
  zoomLevel: number;
  pitch: number;
  children: any;
  onRegionWillChange?: (feature: Feature<Point, RegionPayload>) => void;
  onRegionDidChange?: (feature: Feature<Point, RegionPayload>) => void;
  onTouchStart?: (e: GestureResponderEvent) => void;
  onTouchEnd?: (e: GestureResponderEvent) => void;
  onLongPress?: (
    feature: Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>,
  ) => void;
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
  onTouchStart,
  onTouchEnd,
  onLongPress,
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
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onLongPress={onLongPress}
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
