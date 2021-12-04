import React, { FC, ReactElement } from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Screens } from 'navigation';
import {
  DashboardScreen,
  FavoritesScreen,
  LinesScreen,
  MapScreen,
  SettingsScreen,
} from 'screens';
import store from '../store';

type Props = {
  store: any;
};

const withReduxProvider =
  <P extends Record<string, unknown>>(
    WrappedComponent: React.ComponentType<P>,
    reduxStore: any,
  ): FC<P & Props> =>
  (props: P & Props): ReactElement =>
    (
      <Provider store={reduxStore}>
        <WrappedComponent {...props} />
      </Provider>
    );

export default function () {
  Navigation.registerComponent(Screens.DASHBOARD_SCREEN, () =>
    withReduxProvider(DashboardScreen, store),
  );
  Navigation.registerComponent(Screens.MAP_SCREEN, () =>
    withReduxProvider(MapScreen, store),
  );
  Navigation.registerComponent(Screens.FAVORITES_SCREEN, () =>
    withReduxProvider(FavoritesScreen, store),
  );
  Navigation.registerComponent(Screens.LINES_SCREEN, () =>
    withReduxProvider(LinesScreen, store),
  );
  Navigation.registerComponent(Screens.SETTINGS_SCREEN, () =>
    withReduxProvider(SettingsScreen, store),
  );
}
