import React, { FC, useRef } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
import styles from './styles';
import { MAPBOX_ACCESS_TOKEN } from '@env';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const NYC_COORD = [-73.94594865587045, 40.7227534777328];

const MapScreen: FC = () => {
  const mapViewRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

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
            zoomLevel={11}
            centerCoordinate={NYC_COORD}
            ref={cameraRef}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default MapScreen;
