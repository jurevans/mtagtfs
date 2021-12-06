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
import { gql, useQuery } from '@apollo/client';
import { Screens } from 'navigation/screens';
import { Route } from 'interfaces';
import styles from './styles';

const DashboardScreen: FC = () => {
  const { componentId } = useContext(NavigationContext);
  const { push } = useNavigation();
  console.log({ componentId });

  const GET_ROUTES = gql`
    query GetRoutes($feedIndex: Int!) {
      routes(feedIndex: $feedIndex) {
        feedIndex
        routeId
        routeShortName
        routeLongName
        routeDesc
        routeColor
      }
    }
  `;

  interface RouteVars {
    feedIndex: number;
  }

  const { loading, error, data } = useQuery<{ routes: Route[] }, RouteVars>(
    GET_ROUTES,
    {
      variables: {
        feedIndex: 1,
      },
    },
  );

  const renderItem = ({ item }: ListRenderItemInfo<Route>) => (
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
        keyExtractor={(route: Route) => route.routeId}
      />
    </View>
  );
};

export default DashboardScreen;
