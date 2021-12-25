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
import { GET_FEEDS } from 'apollo/queries';
import LoadingView from 'components/LoadingView';
import ErrorView from 'components/ErrorView';
import { Screens } from 'navigation/screens';
import { IFeed } from 'interfaces';
import config from 'config';
import styles from './styles';

const DashboardScreen: FC = () => {
  const { push } = useNavigation();
  const { loading, error, data } = useQuery<{ feeds: IFeed[] }>(GET_FEEDS);

  const { feeds } = data || {};

  const renderItem = ({ item }: ListRenderItemInfo<IFeed>) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        push(Screens.ROUTES_SCREEN, { feedIndex: item.feedIndex });
      }}>
      <Text>{item.feedPublisherName || config.feeds[item.feedIndex]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Text style={styles.header}>Dashboard</Text>
        {loading && <LoadingView message="Loading feeds" />}
        {error && <ErrorView message={error.message} />}
      </View>
      <FlatList
        data={feeds}
        renderItem={renderItem}
        keyExtractor={(feed: IFeed) => `feed-${feed.feedIndex}`}
      />
    </View>
  );
};

export default DashboardScreen;
