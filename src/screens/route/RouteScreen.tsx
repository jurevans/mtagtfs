import React, { FC, useContext } from 'react';
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
import { Route, Trip, StopTime } from 'interfaces';
import { useAppDispatch } from 'store';
import { setActiveStop } from 'slices/stop';
import styles from './styles';

type Props = {
  route: Route;
};

interface TripVars {
  feedIndex: number;
  routeId: string;
}

const GET_TRIP = gql`
  query GetTrip($feedIndex: Int!, $routeId: String!) {
    nextTrip(feedIndex: $feedIndex, routeId: $routeId) {
      tripId
      tripHeadsign
      directionId
      stopTimes {
        stopSequence
        departureTime {
          hours
          minutes
          seconds
        }
        stop {
          stopId
          stopName
          geom {
            coordinates
          }
        }
      }
    }
  }
`;

const RouteScreen: FC<Props> = ({ route }) => {
  const { componentId = '' } = useContext(NavigationContext);
  const { feedIndex, routeId, routeLongName, routeDesc } = route;
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery<{ nextTrip: Trip }, TripVars>(
    GET_TRIP,
    {
      variables: {
        feedIndex,
        routeId,
      },
    },
  );

  const goToStop = (stopTime: StopTime) => {
    const { stop } = stopTime;
    const { stopId, stopName, geom } = stop;

    dispatch(
      setActiveStop({
        stopId,
        stopName,
        coordinates: geom.coordinates,
      }),
    );

    Navigation.mergeOptions(componentId, {
      bottomTabs: {
        currentTabId: 'MAP_TAB',
      },
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<StopTime>) => (
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

  const renderTrip = (trip: Trip): React.ReactElement => {
    return (
      <FlatList
        data={trip.stopTimes}
        renderItem={renderItem}
        keyExtractor={(stopTime: StopTime) => stopTime.stop.stopId}
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
