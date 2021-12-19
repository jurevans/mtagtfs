import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { View } from 'react-native';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { Feature, Point, Position } from '@turf/turf';
import { RegionPayload } from '@react-native-mapbox-gl/maps';
import { Navigation } from 'react-native-navigation';
import { NavigationContext } from 'react-native-navigation-hooks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import MapView from 'components/MapView';
import TripShape from 'components/TripShape';
import StopShape from 'components/StopShape';
import StopMarker from 'components/StopMarker';
import { StopTimeCallback } from 'components/StopTimeButton';
import { setActiveStop } from 'slices/stops';
import { GET_SHAPE } from 'apollo/queries';
import { ROUTE_FIELDS, STOP_FIELDS, TRIP_FIELDS } from 'apollo/fragments';
import { IRoute, IShape, IStop, IStopTime, ITrip } from 'interfaces';
import { getRadiusByZoomLat } from 'util/';
import styles from './styles';

const DEFAULT_COORD: Position = [-73.94594865587045, 40.7227534777328];
const DEFAULT_ZOOM = 11;
const STOP_ZOOM = 15;

interface ShapeVars {
  shapeId?: string;
}

const MapScreen: FC = () => {
  const { activeStop } = useAppSelector(state => state.stops);
  const dispatch = useAppDispatch();
  const client = useApolloClient();
  const { componentId = '' } = useContext(NavigationContext);

  const [isMarkerVisible, setMarkerVisible] = useState(false);
  const [cameraState, setCameraState] = useState({
    zoomLevel: DEFAULT_ZOOM,
    centerCoordinate: DEFAULT_COORD,
    pitch: 50,
  });

  const { zoomLevel, centerCoordinate, pitch } = cameraState;

  // Retrieve trip fragment from cache
  const trip: ITrip | null = client.readFragment({
    id: `Trip:${activeStop?.feedIndex}:${activeStop?.tripId}`,
    fragment: gql`
      ${TRIP_FIELDS}
    `,
  });

  // Query shape geometries
  const { loading, data } = useQuery<{ shape: IShape }, ShapeVars>(GET_SHAPE, {
    variables: {
      shapeId: trip?.shapeId,
    },
  });

  // Retrieve active stop fragment from cache
  const stop: IStop | null = client.readFragment({
    id: `Stop:${activeStop?.feedIndex}:${activeStop?.stopId}`,
    fragment: gql`
      ${STOP_FIELDS}
    `,
  });

  // Retrieve route fragment from cache
  const route: IRoute | null = client.readFragment({
    id: `Route:${activeStop?.feedIndex}:${trip?.routeId}`,
    fragment: gql`
      ${ROUTE_FIELDS}
    `,
  });

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: stop?.stopName,
        },
      },
    });

    if (stop) {
      setCameraState(state => ({
        ...state,
        centerCoordinate: stop?.geom.coordinates || DEFAULT_COORD,
        zoomLevel: STOP_ZOOM,
      }));
    }
  }, [componentId, stop]);

  const stopTimes = useMemo(() => {
    return trip?.stopTimes.map((stopTime: IStopTime) => ({
      ...stopTime,
      stop: client.readFragment({
        id: (() => {
          const { feedIndex, parentStation, stopId } = stopTime.stop;
          return `Stop:${feedIndex}:${parentStation || stopId}`;
        })(),
        fragment: STOP_FIELDS,
      }),
    }));
  }, [client, trip?.stopTimes]);

  const onStopPress = useCallback<StopTimeCallback>(
    ({ stopId, tripId, feedIndex }) => {
      setMarkerVisible(false);
      dispatch(
        setActiveStop({
          feedIndex: feedIndex,
          tripId: tripId,
          stopId: stopId,
        }),
      );
    },
    [dispatch],
  );

  const onRegionWillChange = useCallback(() => {
    setMarkerVisible(false);
  }, []);

  const onRegionDidChange = useCallback(
    (feature: Feature<Point, RegionPayload>) => {
      const { geometry, properties } = feature;
      setMarkerVisible(true);

      setCameraState({
        ...cameraState,
        pitch: properties.pitch,
        zoomLevel: properties.zoomLevel,
      });

      const radius = getRadiusByZoomLat(
        properties.zoomLevel,
        geometry.coordinates[0],
      );

      console.log('GET NEARBY STOPS', {
        location: geometry.coordinates,
        radius,
        pitch: properties.pitch,
      });
    },
    [cameraState],
  );

  const onLongPress = useCallback(
    (feature: Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>) => {
      const { geometry } = feature;
      const point = geometry as Point;
      setCameraState({
        centerCoordinate: point.coordinates,
        pitch: 0,
        zoomLevel: 18,
      });
    },
    [],
  );

  const shapeLayerId = `line-layer-${trip?.feedIndex}:${trip?.directionId}:${trip?.tripId}`;

  console.log({ shapeLayerId });
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView
          centerCoordinate={centerCoordinate}
          zoomLevel={zoomLevel}
          pitch={pitch}
          onRegionWillChange={onRegionWillChange}
          onRegionDidChange={onRegionDidChange}
          onLongPress={onLongPress}>
          {stop?.geom && isMarkerVisible && (
            <StopMarker
              feedIndex={stop.feedIndex}
              stopId={stop.stopId}
              coordinates={stop.geom.coordinates}
            />
          )}
          {!loading && stopTimes && (
            <TripShape
              shapeSourceId={`shape-source-${trip?.feedIndex}:${trip?.directionId}:${trip?.tripId}`}
              layerId={shapeLayerId}
              color={route?.routeColor}
              coordinates={
                data?.shape.geom.coordinates ||
                stopTimes?.map(st => st.stop.geom.coordinates)
              }
            />
          )}
          {trip &&
            stopTimes &&
            stopTimes.map((st: IStopTime) => (
              <StopShape
                key={st.stop.stopId}
                feedIndex={st.stop.feedIndex}
                stopId={st.stop.parentStation || st.stop.stopId}
                tripId={trip.tripId}
                coordinates={st.stop.geom.coordinates}
                color={route?.routeColor}
                isActive={st.stop?.stopId === stop?.stopId}
                aboveLayerId={shapeLayerId}
                onPress={onStopPress}
              />
            ))}
        </MapView>
      </View>
    </View>
  );
};

export default MapScreen;
