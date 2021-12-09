import { gql } from '@apollo/client';
import { ROUTE_FIELDS, STOP_FIELDS, TRIP_FIELDS } from './fragments';

export const GET_TRIP = gql`
  ${TRIP_FIELDS}
  ${ROUTE_FIELDS}
  ${STOP_FIELDS}
  query GetTrip($feedIndex: Int!, $routeId: String!) {
    nextTrip(feedIndex: $feedIndex, routeId: $routeId) {
      ...TripFields
      route {
        ...RouteFields
      }
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
  query GetRoutes($feedIndex: Int!) {
    routes(feedIndex: $feedIndex) {
      feedIndex
      routeId
      routeShortName
      routeLongName
      routeDesc
      routeColor
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
