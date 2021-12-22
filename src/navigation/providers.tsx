import React, { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { NavigationProvider } from 'react-native-navigation-hooks';

type Props = {
  componentId: string;
};

export const withProviders =
  <P extends Record<string, unknown>>(
    WrappedComponent: React.ComponentType<P>,
    store: any,
    client: any,
  ): FC<P & Props> =>
    (props: P & Props): ReactElement =>
    (
      <NavigationProvider value={{ componentId: props.componentId }}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <WrappedComponent {...props} />
          </ApolloProvider>
        </Provider>
      </NavigationProvider>
    );
