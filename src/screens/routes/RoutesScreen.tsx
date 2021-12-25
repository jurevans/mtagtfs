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
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { GET_ROUTES } from 'apollo/queries';
import { FEED_FIELDS } from 'apollo/fragments';
import { Screens } from 'navigation/screens';
import ErrorView from 'components/ErrorView';
import LoadingView from 'components/LoadingView';
import { IFeed, IRoute } from 'interfaces';
import styles from './styles';

type Props = {
  feedIndex: number;
};

const RoutesScreen: FC<Props> = ({ feedIndex }) => {
  const client = useApolloClient();
  const { push } = useNavigation();
  const { componentId = '' } = useContext(NavigationContext);

  // Retrieve trip fragment from cache
  const feed: IFeed | null = client.readFragment({
    id: `FeedInfo:${feedIndex}`,
    fragment: gql`
      ${FEED_FIELDS}
    `,
  });

  const { feedPublisherName } = feed || {};

  useEffect(() => {
    if (feedPublisherName) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            text: `${feedPublisherName}`,
          },
        },
      });
    }
  }, [componentId, feedPublisherName]);

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
        push(Screens.TRIPS_SCREEN, { route: item });
      }}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ color: item.routeColor ? '#fff' : '#888' }}>
        {item.routeShortName} - {item.routeLongName}
      </Text>
    </TouchableOpacity>
  );

  if (loading) return <LoadingView message="Loading routes..." />;
  if (error) return <ErrorView message={error.message} styles={styles.error} />;

  return (
    <View style={styles.root}>
      <FlatList
        data={data?.routes}
        renderItem={renderItem}
        keyExtractor={(route: IRoute) => `${route.feedIndex}:${route.routeId}`}
      />
    </View>
  );
};

export default RoutesScreen;
