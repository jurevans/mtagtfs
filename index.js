/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import App from './src/App';

Navigation.registerComponent('com.mtagtfs.WelcomeScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.mtagtfs.WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});
