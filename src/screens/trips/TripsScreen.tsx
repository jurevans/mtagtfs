import React, { FC } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from 'react-native-navigation-hooks';
import { useQuery } from '@apollo/client';
import { GET_TRIPS } from 'apollo/queries';
import { IRoute, ITrip } from 'interfaces';
import styles from './styles';
import { Screens } from 'navigation/screens';
import { getTimeFromInterval } from 'util/';

type Props = {
  route: IRoute;
};

interface TripsVars {
  feedIndex: number;
  routeId: string;
}

const TripsScreen: FC<Props> = ({ route }) => {
  const { push } = useNavigation();
  const { data } = useQuery<{ nextTrips: ITrip[] }, TripsVars>(GET_TRIPS, {
    variables: {
      feedIndex: route?.feedIndex,
      routeId: route?.routeId,
    },
  });

  const { nextTrips = [] } = data || {};

  const renderItem = ({ item }: ListRenderItemInfo<ITrip>) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        push(Screens.TRIP_SCREEN, { route, tripId: item.tripId });
      }}>
      <Text>
        {item?.tripHeadsign} - Departs at:
        {getTimeFromInterval(item?.stopTimes[0].departureTime)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Text style={styles.header}>Available Trips</Text>
      </View>
      {data && (
        <FlatList
          data={nextTrips}
          renderItem={renderItem}
          keyExtractor={(trip: ITrip) => trip?.tripId}
        />
      )}
    </View>
  );
};

export default TripsScreen;
