import { Navigation } from 'react-native-navigation';
import { Screens } from 'navigation';
import {
  DashboardScreen,
  FavoritesScreen,
  LinesScreen,
  MapScreen,
  SettingsScreen,
} from 'screens';

export default function () {
  Navigation.registerComponent(Screens.DASHBOARD_SCREEN, () => DashboardScreen);
  Navigation.registerComponent(Screens.MAP_SCREEN, () => MapScreen);
  Navigation.registerComponent(Screens.FAVORITES_SCREEN, () => FavoritesScreen);
  Navigation.registerComponent(Screens.LINES_SCREEN, () => LinesScreen);
  Navigation.registerComponent(Screens.SETTINGS_SCREEN, () => SettingsScreen);
}
