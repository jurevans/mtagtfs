import React, { FC, useCallback, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { Navigation } from 'react-native-navigation';
import { NavigationContext } from 'react-native-navigation-hooks';
import { useAppDispatch } from 'store';
import { setActiveStop } from 'slices/stops';
import TripList from 'components/TripList';
import { StopTimeCallback } from 'components/StopTimeButton';
import { STOP_FIELDS, TRIP_FIELDS } from 'apollo/fragments';
import { IRoute, IStopTime, ITrip } from 'interfaces';
import styles from './styles';
import { GET_STATIONS } from 'apollo/queries';
import LoadingView from 'components/LoadingView';
import ErrorView from 'components/ErrorView';

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
  const stationIds =
    trip?.stopTimes.map(
      (stopTime: IStopTime) =>
        stopTime.stop.parentStation || stopTime.stop.stopId,
    ) || [];

  const { data, loading, error } = useQuery(GET_STATIONS, {
    variables: {
      feedIndex: trip?.feedIndex,
      stationIds,
    },
  });

  useEffect(() => {
    if (trip) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            text: trip.tripHeadsign,
          },
        },
      });
    }
  }, [componentId, trip]);

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

  const stopTimes =
    (data?.stations &&
      trip?.stopTimes.map((stopTime: IStopTime) => {
        const { feedIndex, stopId, parentStation } = stopTime.stop;
        console.log('CACHE_ID:', {
          id: `Stop:${feedIndex}:${parentStation || stopId}`,
        });
        return {
          ...stopTime,
          stop: client.readFragment({
            id: `Stop:${feedIndex}:${parentStation || stopId}`,
            fragment: STOP_FIELDS,
          }),
        };
      })) ||
    [];

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Text style={styles.header}>{route.routeLongName}</Text>
        <Text style={styles.description}>{route.routeDesc}</Text>
        {loading && <LoadingView message="Loading stop times" />}
        {error && <ErrorView message={error.message} />}
      </View>
      {trip && stopTimes && (
        <View>
          <Text style={styles.tripHeader}>
            {trip.tripHeadsign} -{trip.directionId ? 'Inbound' : 'Outbound'}
          </Text>
          <TripList
            tripId={trip?.tripId}
            stopTimes={stopTimes}
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
