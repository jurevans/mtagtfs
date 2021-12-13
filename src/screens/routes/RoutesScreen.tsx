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
import { GET_ROUTES } from 'apollo/queries';
import { Screens } from 'navigation/screens';
import { IRoute } from 'interfaces';
import styles from './styles';
import Error from 'components/Error';
import Loading from 'components/Loading';

type Props = {
  feedIndex: number;
};

const RoutesScreen: FC<Props> = ({ feedIndex }) => {
  const { push } = useNavigation();

  interface RouteVars {
    feedIndex: number;
  }

  const { loading, error, data } = useQuery<{ routes: IRoute[] }, RouteVars>(
    GET_ROUTES,
    {
      variables: {
        feedIndex,
      },
    },
  );

  const renderItem = ({ item }: ListRenderItemInfo<IRoute>) => (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: `#${item.routeColor}`,
      }}
      onPress={() => {
        push(Screens.TRIP_SCREEN, { route: item });
      }}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ color: item.routeColor ? '#fff' : '#888' }}>
        {item.routeShortName} - {item.routeLongName}
      </Text>
    </TouchableOpacity>
  );

  if (loading) return <Loading message="Loading routes..." />;
  if (error) return <Error message={error.message} styles={styles.error} />;

  return (
    <View style={styles.root}>
      <FlatList
        data={data?.routes}
        renderItem={renderItem}
        keyExtractor={(route: IRoute) => `${route.feedIndex}${route.routeId}`}
      />
    </View>
  );
};

export default RoutesScreen;
