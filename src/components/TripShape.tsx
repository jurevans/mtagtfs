import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
import { IRoute, IShape, ITrip } from 'interfaces';
import React, { FC } from 'react';

type Props = {
  layerId: string;
  trip: ITrip;
  route: IRoute | null;
  shape?: IShape;
};

const getLineStyles = (routeColor?: string) => ({
  lineColor: routeColor ? `#${routeColor}` : '#ddd',
  lineWidth: 8.5,
  lineOpacity: 0.75,
});

const TripShape: FC<Props> = ({ layerId, trip, route, shape = {} }) => {
  let { shapeId, geom } = shape;
  if (!shapeId) {
    shapeId = trip.tripId;
  }
  if (!geom) {
    // Create a LineString geometry from stop coordinates:
    geom = {
      type: 'LineString',
      coordinates: trip.stopTimes.map(
        stopTime => stopTime.stop.geom.coordinates,
      ),
    };
  }

  const lineString = turf.lineString(geom?.coordinates as any);

  return (
    <MapboxGL.ShapeSource id={`shape-source-${shapeId}`} shape={lineString}>
      <MapboxGL.LineLayer
        id={layerId}
        style={getLineStyles(route?.routeColor)}
      />
    </MapboxGL.ShapeSource>
  );
};

export default TripShape;
