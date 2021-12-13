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
import Loading from 'components/Loading';
import Error from 'components/Error';
import { Screens } from 'navigation/screens';
import { IFeed } from 'interfaces';
import config from 'config';
import styles from './styles';

const DashboardScreen: FC = () => {
  const { push } = useNavigation();

  const { loading, error, data } = useQuery<{ feeds: IFeed[] }>(GET_FEEDS);

  if (loading) <Loading message="Loading feeds" />;
  if (error) <Error message={error.message} />;

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
