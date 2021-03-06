import React, { FC, useContext, useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  NavigationContext,
  useNavigation,
} from 'react-native-navigation-hooks';
import { useQuery } from '@apollo/client';
import { GET_TRIPS } from 'apollo/queries';
import Loading from 'components/Loading';
import Error from 'components/Error';
import { IRoute, ITrip } from 'interfaces';
import { Screens } from 'navigation/screens';
import styles from './styles';

type Props = {
  route: IRoute;
};

interface TripsVars {
  feedIndex: number;
  routeId: string;
}

const TripsScreen: FC<Props> = ({ route }) => {
  const { push } = useNavigation();
  const { componentId = '' } = useContext(NavigationContext);

  const { loading, error, data } = useQuery<{ nextTrips: ITrip[] }, TripsVars>(
    GET_TRIPS,
    {
      variables: {
        feedIndex: route?.feedIndex,
        routeId: route?.routeId,
      },
    },
  );

  const { nextTrips = [] } = data || {};

  useEffect(() => {
    if (route) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            text: route.routeLongName,
          },
        },
      });
    }
  }, [componentId, route]);

  const renderItem = ({ item }: ListRenderItemInfo<ITrip>) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        push(Screens.TRIP_SCREEN, { route, tripId: item.tripId });
      }}>
      <Text>
        {item?.tripHeadsign} - Departs at:
        {item?.stopTimes[0].departure}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Text style={styles.header}>Available Trips</Text>
      </View>
      {loading && <Loading message="Loading trip times..." />}
      {!loading && !data && <Text>No upcoming trips could be found</Text>}
      {error && <Error message={error.message} />}
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
