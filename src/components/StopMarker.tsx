import React, { FC } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { SvgProps } from 'react-native-svg';
import { Position } from '@turf/turf';
import Pin from 'assets/pin.svg';

interface Props {
  feedIndex: number;
  stopId: string;
  coordinates: Position;
  svgProps?: SvgProps;
}

const svgDefaultProps: SvgProps = {
  width: 50,
  height: 50,
  fill: '#cc0000',
};

const StopMarker: FC<Props> = ({
  feedIndex,
  stopId,
  coordinates,
  svgProps = {},
}) => (
  <MapboxGL.MarkerView
    id={`marker-${feedIndex}:${stopId}`}
    coordinate={coordinates}
    anchor={{ x: 0.5, y: 1.0 }}>
    <Pin nativeID={stopId} {...svgDefaultProps} {...svgProps} />
  </MapboxGL.MarkerView>
);

export default StopMarker;
