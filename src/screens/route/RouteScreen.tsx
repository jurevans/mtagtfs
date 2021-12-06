import React, { FC } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import styles from './styles';

interface Route {
  feedIndex: number;
  routeId: string;
  routeShortName: string;
  routeLongName: string;
  routeDesc: string;
  routeColor: string;
}

type Props = {
  route: Route;
};

interface TripVars {
  feedIndex: number;
  routeId: string;
}

interface Stop {
  stopId: string;
  stopName: string;
  geom: {
    coordinates: [number, number];
  };
}

interface StopTime {
  stopSequence: number;
  departureTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  stop: Stop;
}

interface Trip {
  tripId: string;
  tripHeadsign: string;
  directionId: number;
  stopTimes: StopTime[];
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

const renderItem = ({ item }: ListRenderItemInfo<StopTime>) => (
  <TouchableOpacity style={styles.button}>
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

const Route: FC<Props> = ({ route }) => {
  const { feedIndex, routeId, routeLongName, routeDesc } = route;

  const { loading, error, data } = useQuery<{ nextTrip: Trip }, TripVars>(
    GET_TRIP,
    {
      variables: {
        feedIndex,
        routeId,
      },
    },
  );

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

export default Route;
