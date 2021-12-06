import { Navigation } from 'react-native-navigation';
import { Screens } from './screens';
import { withProviders } from './providers';
import {
  DashboardScreen,
  FavoritesScreen,
  LinesScreen,
  MapScreen,
  SettingsScreen,
  RouteScreen,
} from 'screens';
import store from 'store';
import client from 'apollo/client';

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
    () => withProviders(RouteScreen, store, client),
    () => RouteScreen,
  );
}
