import { Navigation } from 'react-native-navigation';
import { Dimensions } from 'react-native';
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
                animations: {
                  push: {
                    content: {
                      translationX: {
                        from: Dimensions.get('window').width,
                        to: 0,
                        duration: 300,
                        interpolation: { type: 'accelerate' },
                      },
                    },
                  },
                  pop: {
                    content: {
                      translationX: {
                        from: 0,
                        to: Dimensions.get('window').width,
                        duration: 300,
                        interpolation: { type: 'decelerate' },
                      },
                    },
                  },
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
