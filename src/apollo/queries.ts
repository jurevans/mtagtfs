import { gql } from '@apollo/client';
import {
  FEED_FIELDS,
  ROUTE_FIELDS,
  STOP_FIELDS,
  TRIP_FIELDS,
} from './fragments';

export const GET_FEEDS = gql`
  ${FEED_FIELDS}
  query GetFeeds {
    feeds {
      ...FeedFields
    }
  }
`;

export const GET_TRIPS = gql`
  ${TRIP_FIELDS}
  ${STOP_FIELDS}
  query GetNextTrips($feedIndex: Int!, $routeId: String!) {
    nextTrips(feedIndex: $feedIndex, routeId: $routeId) {
      ...TripFields
      stopTimes {
        stopSequence
        departure
        stop {
          ...StopFields
        }
      }
    }
  }
`;

export const GET_ROUTES = gql`
  ${ROUTE_FIELDS}
  query GetRoutes($feedIndex: Int!) {
    routes(feedIndex: $feedIndex) {
      ...RouteFields
    }
  }
`;

export const GET_SHAPE = gql`
  query GetShape($shapeId: String!) {
    shape(shapeId: $shapeId) {
      shapeId
      length
      geom {
        type
        coordinates
      }
    }
  }
`;
