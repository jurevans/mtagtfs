import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
import { IRoute, IShape } from 'interfaces';
import React, { FC } from 'react';

type Props = {
  route: IRoute | null;
  shape: IShape;
};

const getLineStyles = (routeColor?: string) => ({
  lineColor: routeColor ? `#${routeColor}` : '#ddd',
  lineWidth: 8.5,
  lineOpacity: 0.75,
});

const TripShape: FC<Props> = ({ shape = {}, route }) => {
  let { shapeId, geom } = shape;

  const lineString = turf.lineString(geom?.coordinates as any);

  return (
    <MapboxGL.ShapeSource id={`shape-source-${shapeId}`} shape={lineString}>
      <MapboxGL.LineLayer
        id={`line-layer-${shapeId}`}
        style={getLineStyles(route?.routeColor)}
      />
    </MapboxGL.ShapeSource>
  );
};

export default TripShape;
