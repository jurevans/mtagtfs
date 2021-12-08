import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
import { IShape, ITrip } from 'interfaces';
import React, { FC } from 'react';

type Props = {
  trip: ITrip | null;
  shape: IShape;
};

const getLineStyles = (trip: ITrip | null) => ({
  lineColor: trip?.route.routeColor ? `#${trip?.route.routeColor}` : '#ddd',
  lineWidth: 8.5,
  lineOpacity: 0.75,
});

const TripShape: FC<Props> = ({ shape, trip }) => {
  const { shapeId, geom } = shape;
  const lineString = turf.lineString(geom.coordinates as any);

  return (
    <MapboxGL.ShapeSource
      id={`shape-source-${shape.shapeId}`}
      shape={lineString}>
      <MapboxGL.LineLayer
        id={`line-layer-${shapeId}`}
        style={getLineStyles(trip)}
      />
    </MapboxGL.ShapeSource>
  );
};

export default TripShape;
