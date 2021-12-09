import { gql } from '@apollo/client';
import { ROUTE_FIELDS, STOP_FIELDS, TRIP_FIELDS } from './fragments';

export const GET_TRIP = gql`
  ${TRIP_FIELDS}
  ${STOP_FIELDS}
  query GetTrip($feedIndex: Int!, $routeId: String!) {
    nextTrip(feedIndex: $feedIndex, routeId: $routeId) {
      ...TripFields
      stopTimes {
        stopSequence
        departureTime {
          hours
          minutes
          seconds
        }
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
