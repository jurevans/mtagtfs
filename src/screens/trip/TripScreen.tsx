import React, { FC, useCallback, useContext, useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { Navigation } from 'react-native-navigation';
import { NavigationContext } from 'react-native-navigation-hooks';
import { useAppDispatch } from 'store';
import { setActiveStop } from 'slices/stops';
import { setActiveTrip } from 'slices/trips';
import { GET_TRIP } from 'apollo/queries';
import Loading from 'components/Loading';
import Error from 'components/Error';
import { IRoute, ITrip, IStopTime } from 'interfaces';
import { getTimeFromInterval } from 'util/';
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

  const goToStop = useCallback(
    (stopTime: IStopTime) => {
      const { stop } = stopTime;
      const { stopId, feedIndex } = stop;

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

  const renderItem = ({ item }: ListRenderItemInfo<IStopTime>) => {
    const time = getTimeFromInterval(item.departureTime);

    return (
      <TouchableOpacity style={styles.button} onPress={() => goToStop(item)}>
        <Text>
          {item.stopSequence} - {item.stop.stopId} - {item.stop.stopName}
        </Text>
        <Text>Departs at: {time}</Text>
      </TouchableOpacity>
    );
  };

  const renderTrip = (trip: ITrip): React.ReactElement => {
    return (
      <FlatList
        data={trip.stopTimes}
        renderItem={renderItem}
        keyExtractor={(stopTime: IStopTime) => stopTime.stop.stopId}
      />
    );
  };

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
      {data && renderTrip(data.nextTrip)}
    </View>
  );
};

export default TripScreen;
