import React, { FC } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { ActiveStop } from 'slices/stops';
import { SvgProps } from 'react-native-svg';
import Pin from 'assets/pin.svg';

type Props = {
  stop: ActiveStop;
};

const svgProps: SvgProps = {
  width: 50,
  height: 50,
  fill: '#cc0000',
};

const StopMarker: FC<Props> = ({ stop }) => (
  <MapboxGL.MarkerView id={stop.stopId} coordinate={stop.coordinates}>
    <Pin nativeID={stop.stopId} {...svgProps} />
  </MapboxGL.MarkerView>
);

export default StopMarker;
