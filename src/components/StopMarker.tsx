import React, { FC } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { ActiveStop } from 'slices/stops';
import { Text, View } from 'react-native';
import Pin from 'assets/pin.svg';
import { SvgProps } from 'react-native-svg';

type Props = {
  stop: ActiveStop;
};

const markerStyles: SvgProps = {
  width: 50,
  height: 50,
  fill: '#cc0000',
};

const StopMarker: FC<Props> = ({ stop }) => (
  <MapboxGL.MarkerView id={stop.stopId} coordinate={stop.coordinates}>
    <View>
      <Text>{stop.stopName}</Text>
      <Pin nativeID={stop.stopId} {...markerStyles} />
    </View>
  </MapboxGL.MarkerView>
);

export default StopMarker;
