import MapboxGL from '@react-native-mapbox-gl/maps';
import { Shape } from 'interfaces';
import React, { FC } from 'react';
import { ActiveTrip } from 'slices/trips';

type Props = {
  trip: ActiveTrip | null;
  shape: Shape;
};

const getLineStyles = (activeTrip: ActiveTrip | null) => ({
  lineColor: activeTrip?.route.routeColor
    ? `#${activeTrip?.route.routeColor}`
    : '#ddd',
  lineWidth: 8.5,
  lineOpacity: 0.75,
});

const TripShape: FC<Props> = ({ shape, trip }) => {
  const { shapeId, geom } = shape;

  return (
    <MapboxGL.ShapeSource
      id={`shape-source-${shape.shapeId}`}
      shape={{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: geom.coordinates as any,
        },
      }}>
      <MapboxGL.LineLayer
        id={`line-layer-${shapeId}`}
        style={getLineStyles(trip)}
      />
    </MapboxGL.ShapeSource>
  );
};

export default TripShape;
