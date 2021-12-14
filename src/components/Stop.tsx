import React, { FC } from 'react';
import MapboxGL, { CircleLayerStyle } from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
import { StopTimeCallback } from './StopTime';

type Props = {
  feedIndex: number;
  tripId: string;
  stopId: string;
  coordinates: turf.Position;
  color?: string;
  isActive?: boolean;
  aboveLayerId: string;
  onPress: StopTimeCallback;
};

const getCircleStyles = (
  color: string,
  isActive: boolean,
): CircleLayerStyle => ({
  circleRadius: isActive ? 16 : 6,
  circleColor: `#${isActive ? 'ddd' : color || 'ddd'}`,
  circleStrokeColor: `#ddd`,
  circleStrokeWidth: 2,
  circlePitchScale: 'map',
  circlePitchAlignment: 'map',
  circleColorTransition: {
    duration: 4000,
    delay: 4000,
  },
  circleRadiusTransition: {
    duration: 500,
    delay: 500,
  },
});

const Stop: FC<Props> = ({
  feedIndex,
  tripId,
  stopId,
  coordinates,
  color = 'ddd',
  isActive = false,
  aboveLayerId,
  onPress,
}) => {
  const point = turf.point(coordinates);
  return (
    <MapboxGL.ShapeSource
      id={`shape-source-${feedIndex}:${stopId}`}
      key={`${stopId}`}
      shape={point}
      onPress={() => onPress({ feedIndex, tripId, stopId })}>
      <MapboxGL.CircleLayer
        id={`circle-layer-${feedIndex}:${stopId}`}
        style={getCircleStyles(color, isActive)}
        minZoomLevel={12}
        aboveLayerID={aboveLayerId}
      />
    </MapboxGL.ShapeSource>
  );
};

export default Stop;
