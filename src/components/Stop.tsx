import React, { FC } from 'react';
import MapboxGL, { CircleLayerStyle } from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
import { Coordinate } from 'interfaces';

type Props = {
  feedIndex: number;
  stopId: string;
  coordinates: Coordinate;
  color?: string;
  isActive?: boolean;
  aboveLayerId: string;
  onPress: (feedIndex: number, stopId: string) => void;
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
      onPress={() => onPress(feedIndex, stopId)}>
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
