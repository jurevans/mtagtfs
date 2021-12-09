import React, { FC, useContext } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationContext,
  useNavigation,
} from 'react-native-navigation-hooks';
import { useQuery } from '@apollo/client';
import { GET_ROUTES } from 'apollo/queries';
import { Screens } from 'navigation/screens';
import { IRoute } from 'interfaces';
import styles from './styles';

const DashboardScreen: FC = () => {
  const { componentId } = useContext(NavigationContext);
  const { push } = useNavigation();
  console.log({ componentId });

  interface RouteVars {
    feedIndex: number;
  }

  const { loading, error, data } = useQuery<{ routes: IRoute[] }, RouteVars>(
    GET_ROUTES,
    {
      variables: {
        feedIndex: 1,
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
        push(Screens.ROUTE_SCREEN, { route: item });
      }}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ color: item.routeColor ? '#fff' : '#888' }}>
        {item.routeShortName} - {item.routeLongName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      {loading && <Text>Loading...</Text>}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      <FlatList
        data={data?.routes}
        renderItem={renderItem}
        keyExtractor={(route: IRoute) => route.routeId}
      />
    </View>
  );
};

export default DashboardScreen;
