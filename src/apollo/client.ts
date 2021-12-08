import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { GTFS_API_GATEWAY_URL, GTFS_API_GATEWAY_KEY } from '@env';

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
  cache: new InMemoryCache({
    typePolicies: {
      Stop: {
        keyFields: Stop => `${Stop.__typename}:${Stop.stopId}`,
      },
    },
  }),
});

export default client;
