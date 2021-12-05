import { Navigation } from 'react-native-navigation';
import { Screens } from './screens';
import { withProviders } from './providers';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  DashboardScreen,
  FavoritesScreen,
  LinesScreen,
  MapScreen,
  SettingsScreen,
} from 'screens';

import store from '../store';
import { GTFS_API_GATEWAY_URL, GTFS_API_GATEWAY_KEY } from '@env';

const client = new ApolloClient({
  uri: GTFS_API_GATEWAY_URL,
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': GTFS_API_GATEWAY_KEY,
  },
});

export default function () {
  Navigation.registerComponent(
    Screens.DASHBOARD_SCREEN,
    () => withProviders(DashboardScreen, store, client),
    () => DashboardScreen,
  );
  Navigation.registerComponent(
    Screens.MAP_SCREEN,
    () => withProviders(MapScreen, store, client),
    () => MapScreen,
  );
  Navigation.registerComponent(
    Screens.FAVORITES_SCREEN,
    () => withProviders(FavoritesScreen, store, client),
    () => FavoritesScreen,
  );
  Navigation.registerComponent(
    Screens.LINES_SCREEN,
    () => withProviders(LinesScreen, store, client),
    () => LinesScreen,
  );
  Navigation.registerComponent(
    Screens.SETTINGS_SCREEN,
    () => withProviders(SettingsScreen, store, client),
    () => SettingsScreen,
  );
}
