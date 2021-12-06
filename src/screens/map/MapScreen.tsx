import React, { FC, useRef } from 'react';
import MapboxGL, { MapView } from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
import styles from './styles';
import { MAPBOX_ACCESS_TOKEN } from '@env';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MapScreen: FC = () => {
  const ref = useRef<MapView>(null);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Dark}
          pitchEnabled={true}
          logoEnabled={false}
          compassEnabled={true}
          ref={ref}
        />
      </View>
    </View>
  );
};

export default MapScreen;
