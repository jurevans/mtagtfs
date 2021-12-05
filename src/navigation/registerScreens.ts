import { Navigation } from 'react-native-navigation';
import { Screens } from './screens';
import { withProviders } from './providers';
import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {
  DashboardScreen,
  FavoritesScreen,
  LinesScreen,
  MapScreen,
  SettingsScreen,
} from 'screens';

import store from '../store';
import { GTFS_API_GATEWAY_URL, GTFS_API_GATEWAY_KEY } from '@env';
import RouteScreen from 'screens/route/RouteScreen';

const link = new HttpLink({ uri: GTFS_API_GATEWAY_URL });
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-api-key': GTFS_API_GATEWAY_KEY,
    },
  }));
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
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
  Navigation.registerComponent(
    Screens.ROUTE_SCREEN,
    () => RouteScreen,
    () => RouteScreen,
  );
}
