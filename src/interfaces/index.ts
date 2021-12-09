export type Coordinate = [number, number];

export interface IRoute {
  feedIndex: number;
  routeId: string;
  routeShortName: string;
  routeLongName: string;
  routeDesc: string;
  routeColor: string;
}

export interface IStop {
  stopId: string;
  stopName: string;
  geom: {
    coordinates: Coordinate;
  };
}

export interface IStopTime {
  stopSequence: number;
  departureTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  stop: IStop;
}

export interface ITrip {
  feedIndex: number;
  tripId: string;
  tripHeadsign: string;
  directionId: number;
  stopTimes: IStopTime[];
  shapeId: string;
  routeId: string;
  route: IRoute;
}

export interface IShape {
  shapeId: string;
  length: number;
  geom: {
    type: string;
    coordinates: Coordinate[];
  };
}
