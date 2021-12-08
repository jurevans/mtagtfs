import React, { FC } from 'react';
import MapboxGL, { CircleLayerStyle } from '@react-native-mapbox-gl/maps';
import { IStop, IStopTime, ITrip } from 'interfaces';
import * as turf from '@turf/turf';

type Props = {
  stopId: string;
  trip: ITrip;
  goToStop: (stop: IStop) => void;
};

const getCircleStyles = (color?: string): CircleLayerStyle => ({
  circleRadius: 6,
  circleColor: color ? `#${color}` : '#ddd',
  circleStrokeColor: `#ddd`,
  circleStrokeWidth: 2,
  circlePitchScale: 'map',
  circlePitchAlignment: 'map',
});

const Stop: FC<Props> = ({ stopId, trip, goToStop }) => {
  const stopTime: IStopTime | any = trip.stopTimes.find(
    (st: IStopTime) => st.stop.stopId === stopId,
  );
  const { stop }: { stop: IStop } = stopTime || {};
  const { shapeId } = trip;
  const point = turf.point(stop.geom.coordinates);
  const color = trip.route.routeColor;

  return (
    <MapboxGL.ShapeSource
      id={`shape-source-${stop.stopId}`}
      key={`${stop.stopId}`}
      shape={point}
      onPress={() => goToStop(stop)}>
      <MapboxGL.CircleLayer
        id={`circle-layer-${stop.stopId}`}
        style={getCircleStyles(color)}
        minZoomLevel={12}
        aboveLayerID={`line-layer-${shapeId}`}
      />
    </MapboxGL.ShapeSource>
  );
};

export default Stop;
