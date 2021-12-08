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
