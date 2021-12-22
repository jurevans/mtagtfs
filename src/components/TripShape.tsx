import MapboxGL, { LineLayerStyle } from '@react-native-mapbox-gl/maps';
import { lineString, Position } from '@turf/turf';
import React, { FC } from 'react';

interface Props {
  shapeSourceId: string;
  layerId: string;
  color?: string;
  coordinates?: Position[];
}

const getLineStyles = (color?: string): LineLayerStyle => ({
  lineColor: `#${color ? color : 'ddd'}`,
  lineWidth: 8.5,
  lineOpacity: 0.75,
  lineCap: 'round',
});

const TripShape: FC<Props> = ({
  shapeSourceId,
  layerId,
  color,
  coordinates = [],
}) => {
  const shape = lineString(coordinates);
  return (
    <MapboxGL.ShapeSource id={shapeSourceId} shape={shape}>
      <MapboxGL.LineLayer id={layerId} style={getLineStyles(color)} />
    </MapboxGL.ShapeSource>
  );
};

export default TripShape;
