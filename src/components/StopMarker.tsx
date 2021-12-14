import React, { FC } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { SvgProps } from 'react-native-svg';
import { Position } from '@turf/turf';
import Pin from 'assets/pin.svg';

type Props = {
  feedIndex: number;
  stopId: string;
  coordinates: Position;
};

const svgProps: SvgProps = {
  width: 50,
  height: 50,
  fill: '#cc0000',
};

const StopMarker: FC<Props> = ({ feedIndex, stopId, coordinates }) => (
  <MapboxGL.MarkerView
    id={`marker-${feedIndex}:${stopId}`}
    coordinate={coordinates}>
    <Pin nativeID={stopId} {...svgProps} />
  </MapboxGL.MarkerView>
);

export default StopMarker;
