import React, { FC } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { SvgProps } from 'react-native-svg';
import { IStop } from 'interfaces';
import Pin from 'assets/pin.svg';

type Props = {
  stop: IStop;
};

const svgProps: SvgProps = {
  width: 50,
  height: 50,
  fill: '#cc0000',
};

const StopMarker: FC<Props> = ({ stop }) => (
  <MapboxGL.MarkerView id={stop.stopId} coordinate={stop.geom.coordinates}>
    <Pin nativeID={stop.stopId} {...svgProps} />
  </MapboxGL.MarkerView>
);

export default StopMarker;
