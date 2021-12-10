import React, { FC } from 'react';
import MapboxGL, { CircleLayerStyle } from '@react-native-mapbox-gl/maps';
import { IStop } from 'interfaces';
import * as turf from '@turf/turf';

type Props = {
  stop: IStop;
  color?: string;
  isActive?: boolean;
  aboveLayerId: string;
  onPress: (stop: IStop) => void;
};

const getCircleStyles = (
  color: string,
  isActive: boolean,
): CircleLayerStyle => ({
  circleRadius: isActive ? 12 : 6,
  circleColor: `#${color}`,
  circleStrokeColor: `#ddd`,
  circleStrokeWidth: 2,
  circlePitchScale: 'map',
  circlePitchAlignment: 'map',
});

const Stop: FC<Props> = ({
  stop,
  color = 'ddd',
  isActive = false,
  aboveLayerId,
  onPress,
}) => {
  const point = turf.point(stop.geom.coordinates);

  return (
    <MapboxGL.ShapeSource
      id={`shape-source-${stop.feedIndex}:${stop.stopId}`}
      key={`${stop.stopId}`}
      shape={point}
      onPress={() => onPress(stop)}>
      <MapboxGL.CircleLayer
        id={`circle-layer-${stop.feedIndex}:${stop.stopId}`}
        style={getCircleStyles(color, isActive)}
        minZoomLevel={12}
        aboveLayerID={aboveLayerId}
      />
    </MapboxGL.ShapeSource>
  );
};

export default Stop;
