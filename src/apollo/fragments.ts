import { gql } from '@apollo/client';

export const FEED_FIELDS = gql`
  fragment FeedFields on FeedInfo {
    feedIndex
    feedPublisherName
  }
`;

export const STOP_FIELDS = gql`
  fragment StopFields on Stop {
    feedIndex
    stopId
    stopName
    parentStation
    geom {
      coordinates
    }
  }
`;

export const ROUTE_FIELDS = gql`
  fragment RouteFields on Route {
    feedIndex
    routeId
    routeShortName
    routeLongName
    routeDesc
    routeColor
    routeUrl
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
    stopTimes {
      departure
      stop {
        feedIndex
        stopId
        stopName
        geom {
          coordinates
        }
      }
    }
  }
`;
