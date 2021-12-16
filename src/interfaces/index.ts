export interface IRoute {
  feedIndex: number;
  routeId: string;
  routeShortName: string;
  routeLongName: string;
  routeDesc: string;
  routeColor: string;
  routeUrl: string;
}

export interface IFeed {
  feedIndex: number;
  feedPublisherName: string;
}

export interface IStop {
  feedIndex: number;
  stopId: string;
  stopName: string;
  parentStation: string;
  geom: GeoJSON.Point;
}

export interface IStopTime {
  tripId: string;
  stopSequence: number;
  departure: string;
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
  geom: GeoJSON.LineString;
}

export interface IInterval {
  hours: number;
  minutes: number;
  seconds: number;
}
