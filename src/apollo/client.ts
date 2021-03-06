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
      FeedInfo: {
        keyFields: FeedInfo => `${FeedInfo.__typename}:${FeedInfo.feedIndex}`,
      },
      Stop: {
        keyFields: Stop =>
          `${Stop.__typename}:${Stop.feedIndex}:${Stop.stopId}`,
      },
      Trip: {
        keyFields: Trip =>
          `${Trip.__typename}:${Trip.feedIndex}:${Trip.tripId}`,
      },
      Route: {
        keyFields: Route =>
          `${Route.__typename}:${Route.feedIndex}:${Route.routeId}`,
      },
    },
  }),
});

export default client;
