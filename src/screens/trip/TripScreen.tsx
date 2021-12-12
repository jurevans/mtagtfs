import React, { FC, useCallback, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { Navigation } from 'react-native-navigation';
import { NavigationContext } from 'react-native-navigation-hooks';
import { useAppDispatch } from 'store';
import { setActiveStop } from 'slices/stops';
import { setActiveTrip } from 'slices/trips';
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
      },
    },
  );
  const { nextTrip } = data || {};

  const goToStop = useCallback<StopTimeCallback>(
    ({ stopId, feedIndex }) => {
      dispatch(
        setActiveStop({
          feedIndex,
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

  if (loading) return <Loading message="Loading trip..." />;
  if (error) return <Error message={error.message} styles={styles.error} />;

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Text style={styles.header}>{route.routeLongName}</Text>
        <Text style={styles.description}>{route.routeDesc}</Text>
        {data && (
          <Text style={styles.tripHeader}>
            {data.nextTrip.tripHeadsign} -
            {data.nextTrip.directionId ? 'Inbound' : 'Outbound'}
          </Text>
        )}
      </View>
      {data && (
        <Trip
          stopTimes={data.nextTrip.stopTimes}
          styles={{
            button: styles.button,
            label: { fontWeight: 'bold', fontSize: 16 },
            departure: { color: '#999' },
          }}
          onPress={goToStop}
        />
      )}
    </View>
  );
};

export default TripScreen;
