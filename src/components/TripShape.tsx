import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
import { Coordinate } from 'interfaces';
import React, { FC } from 'react';

type Props = {
  shapeSourceId: string;
  layerId: string;
  color?: string;
  coordinates?: Coordinate[];
};

const getLineStyles = (color?: string) => ({
  lineColor: color ? `#${color}` : '#ddd',
  lineWidth: 8.5,
  lineOpacity: 0.75,
});

const TripShape: FC<Props> = ({
  shapeSourceId,
  layerId,
  color,
  coordinates = [],
}) => {
  const lineString = turf.lineString(coordinates);

  return (
    <MapboxGL.ShapeSource id={shapeSourceId} shape={lineString}>
      <MapboxGL.LineLayer id={layerId} style={getLineStyles(color)} />
    </MapboxGL.ShapeSource>
  );
};

export default TripShape;
