import React, { FC, useCallback, useContext, useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { Navigation } from 'react-native-navigation';
import { NavigationContext } from 'react-native-navigation-hooks';
import { IRoute, ITrip, IStopTime } from 'interfaces';
import { useAppDispatch } from 'store';
import { setActiveStop } from 'slices/stops';
import styles from './styles';
import { setActiveTrip } from 'slices/trips';
import { ROUTE_FIELDS, STOP_FIELDS, TRIP_FIELDS } from 'apollo/fragments';

type Props = {
  route: IRoute;
};

interface TripVars {
  feedIndex: number;
  routeId: string;
}

export const GET_TRIP = gql`
  ${TRIP_FIELDS}
  ${ROUTE_FIELDS}
  ${STOP_FIELDS}
  query GetTrip($feedIndex: Int!, $routeId: String!) {
    nextTrip(feedIndex: $feedIndex, routeId: $routeId) {
      ...TripFields
      route {
        ...RouteFields
      }
      stopTimes {
        stopSequence
        departureTime {
          hours
          minutes
          seconds
        }
        stop {
          ...StopFields
        }
      }
    }
  }
`;

const RouteScreen: FC<Props> = ({ route }) => {
  const { componentId = '' } = useContext(NavigationContext);
  const { feedIndex, routeId, routeLongName, routeDesc } = route;
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery<{ nextTrip: ITrip }, TripVars>(
    GET_TRIP,
    {
      variables: {
        feedIndex,
        routeId,
      },
    },
  );
  const { nextTrip } = data || {};

  const goToStop = useCallback(
    (stopTime: IStopTime) => {
      const { stop } = stopTime;
      const { stopId } = stop;

      dispatch(
        setActiveStop({
          stopId,
        }),
      );

      Navigation.mergeOptions(componentId, {
        bottomTabs: {
          currentTabId: 'MAP_TAB',
        },
      });
    },
    [componentId, dispatch],
  );

  useEffect(() => {
    if (nextTrip) {
      dispatch(
        setActiveTrip({
          feedIndex: nextTrip.feedIndex,
          tripId: nextTrip.tripId,
          shapeId: nextTrip.shapeId,
          routeId: nextTrip.routeId,
        }),
      );
    }
  }, [nextTrip, dispatch]);

  const renderItem = ({ item }: ListRenderItemInfo<IStopTime>) => (
    <TouchableOpacity style={styles.button} onPress={() => goToStop(item)}>
      <Text>
        {item.stopSequence} - {item.stop.stopId} - {item.stop.stopName}
      </Text>
      <Text>
        Departs at: {item.departureTime.hours}:{item.departureTime.minutes}:
        {item.departureTime.seconds ? item.departureTime.seconds : '00'}
      </Text>
    </TouchableOpacity>
  );

  const renderTrip = (trip: ITrip): React.ReactElement => {
    return (
      <FlatList
        data={trip.stopTimes}
        renderItem={renderItem}
        keyExtractor={(stopTime: IStopTime) => stopTime.stop.stopId}
      />
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Text style={styles.header}>{routeLongName}</Text>
        <Text style={styles.description}>{routeDesc}</Text>
        {loading && <Text>Loading stop times...</Text>}
        {error && <Text style={styles.error}>Error: {error.message}</Text>}
        {data && (
          <Text style={styles.tripHeader}>
            {data.nextTrip.tripHeadsign} -
            {data.nextTrip.directionId ? 'Inbound' : 'Outbound'}
          </Text>
        )}
      </View>
      {data && renderTrip(data.nextTrip)}
    </View>
  );
};

export default RouteScreen;
