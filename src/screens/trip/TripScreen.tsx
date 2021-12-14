import React, { FC, useCallback, useContext } from 'react';
import { Text, View } from 'react-native';
import { gql, useApolloClient } from '@apollo/client';
import { Navigation } from 'react-native-navigation';
import { NavigationContext } from 'react-native-navigation-hooks';
import { useAppDispatch } from 'store';
import { setActiveStop } from 'slices/stops';
import Trip from 'components/Trip';
import { StopTimeCallback } from 'components/StopTime';
import { IRoute, ITrip } from 'interfaces';
import styles from './styles';
import { TRIP_FIELDS } from 'apollo/fragments';

type Props = {
  route: IRoute;
  tripId: string;
};

const TripScreen: FC<Props> = ({ tripId, route }) => {
  const { componentId = '' } = useContext(NavigationContext);
  const dispatch = useAppDispatch();
  const client = useApolloClient();

  const trip: ITrip | null = client.readFragment({
    id: `Trip:${route?.feedIndex}:${tripId}`,
    fragment: gql`
      ${TRIP_FIELDS}
    `,
  });

  const goToStop = useCallback<StopTimeCallback>(
    // eslint-disable-next-line no-shadow
    ({ stopId, tripId, feedIndex }) => {
      dispatch(
        setActiveStop({
          feedIndex,
          tripId,
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

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Text style={styles.header}>{route.routeLongName}</Text>
        <Text style={styles.description}>{route.routeDesc}</Text>
      </View>
      {trip && (
        <View>
          <Text style={styles.tripHeader}>
            {trip.tripHeadsign} -{trip.directionId ? 'Inbound' : 'Outbound'}
          </Text>
          <Trip
            tripId={trip?.tripId}
            stopTimes={trip.stopTimes}
            styles={{
              button: styles.button,
              label: { fontWeight: 'bold', fontSize: 16 },
              departure: { color: '#999' },
            }}
            onPress={goToStop}
          />
        </View>
      )}
    </View>
  );
};

export default TripScreen;
