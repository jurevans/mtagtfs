import React, { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

type Props = {
  store: any;
};

export const withProviders =
  <P extends Record<string, unknown>>(
    WrappedComponent: React.ComponentType<P>,
    store: any,
    client: any,
  ): FC<P & Props> =>
  (props: P & Props): ReactElement =>
    (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <WrappedComponent {...props} />
        </ApolloProvider>
      </Provider>
    );
