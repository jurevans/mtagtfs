/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import { DashboardScreen } from 'containers/DashboardScreen';
import { SettingsScreen } from 'containers/SettingsScreen';
import { FavoritesScreen } from 'containers/FavoritesScreen';
import { LinesScreen } from 'containers/LinesScreen';
import { MapScreen } from 'containers/MapScreen';

Navigation.registerComponent('DashboardScreen', () => DashboardScreen);
Navigation.registerComponent('MapScreen', () => MapScreen);
Navigation.registerComponent('FavoritesScreen', () => FavoritesScreen);
Navigation.registerComponent('LinesScreen', () => LinesScreen);
Navigation.registerComponent('SettingsScreen', () => SettingsScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'DASHBOARD_TAB',
              children: [
                {
                  component: {
                    id: 'DASHBOARD_SCREEN',
                    name: 'DashboardScreen',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Dashboard',
                },
              },
            },
          },
          {
            stack: {
              id: 'MAP_TAB',
              children: [
                {
                  component: {
                    id: 'MAP_SCREEN',
                    name: 'MapScreen',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Map',
                },
              },
            },
          },
          {
            stack: {
              id: 'FAVORITES_TAB',
              children: [
                {
                  component: {
                    id: 'FAVORITES_SCREEN',
                    name: 'FavoritesScreen',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Favorites',
                },
              },
            },
          },
          {
            stack: {
              id: 'LINES_TAB',
              children: [
                {
                  component: {
                    id: 'LINES_SCREEN',
                    name: 'LinesScreen',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Lines',
                },
              },
            },
          },
          {
            stack: {
              id: 'SETTINGS_TAB',
              children: [
                {
                  component: {
                    id: 'SETTINGS_SCREEN',
                    name: 'SettingsScreen',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Settings',
                },
              },
            },
          },
        ],
      },
    },
  });
});
