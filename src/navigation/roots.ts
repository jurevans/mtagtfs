import { Navigation } from 'react-native-navigation';
import { Screens } from './screens';
import registerScreens from './registerScreens';

registerScreens();

export const pushTabbedApp = () => {
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
                    name: Screens.DASHBOARD_SCREEN,
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
                    name: Screens.MAP_SCREEN,
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
                    name: Screens.FAVORITES_SCREEN,
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
                    name: Screens.LINES_SCREEN,
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
                    name: Screens.SETTINGS_SCREEN,
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
};
