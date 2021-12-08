import { gql } from '@apollo/client';

export const STOP_FIELDS = gql`
  fragment StopFields on Stop {
    stopId
    stopName
    geom {
      coordinates
    }
  }
`;

export const ROUTE_FIELDS = gql`
  fragment RouteFields on Route {
    routeShortName
    routeLongName
    routeDesc
    routeColor
  }
`;

export const TRIP_FIELDS = gql`
  fragment TripFields on Trip {
    feedIndex
    tripId
    tripHeadsign
    directionId
    shapeId
    routeId
  }
`;
