import React, { FC, useCallback, useContext } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { Navigation } from 'react-native-navigation';
import { NavigationContext } from 'react-native-navigation-hooks';
import { useAppDispatch } from 'store';
import { setActiveStop } from 'slices/stops';
import { GET_TRIP } from 'apollo/queries';
import Loading from 'components/Loading';
import Error from 'components/Error';
import Trip from 'components/Trip';
import { StopTimeCallback } from 'components/StopTime';
import { IRoute, ITrip } from 'interfaces';
import styles from './styles';

type Props = {
  route: IRoute;
};

interface TripVars {
  feedIndex: number;
  routeId: string;
  directionId: number;
}

const TripScreen: FC<Props> = ({ route }) => {
  const { componentId = '' } = useContext(NavigationContext);
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery<{ nextTrip: ITrip }, TripVars>(
    GET_TRIP,
    {
      variables: {
        feedIndex: route.feedIndex,
        routeId: route.routeId,
        directionId: 1,
      },
    },
  );
  const { nextTrip } = data || {};

  const goToStop = useCallback<StopTimeCallback>(
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

  if (loading) return <Loading message="Loading trip..." />;
  if (error) return <Error message={error.message} styles={styles.error} />;

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Text style={styles.header}>{route.routeLongName}</Text>
        <Text style={styles.description}>{route.routeDesc}</Text>
      </View>
      {data && (
        <View>
          <Text style={styles.tripHeader}>
            {data.nextTrip.tripHeadsign} -
            {data.nextTrip.directionId ? 'Inbound' : 'Outbound'}
          </Text>
          <Trip
            tripId={nextTrip?.tripId || ''}
            stopTimes={data.nextTrip.stopTimes}
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
