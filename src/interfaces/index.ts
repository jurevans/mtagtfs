export interface Route {
  feedIndex: number;
  routeId: string;
  routeShortName: string;
  routeLongName: string;
  routeDesc: string;
  routeColor: string;
}

export interface Stop {
  stopId: string;
  stopName: string;
  geom: {
    coordinates: [number, number];
  };
}

export interface StopTime {
  stopSequence: number;
  departureTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  stop: Stop;
}

export interface Trip {
  tripId: string;
  tripHeadsign: string;
  directionId: number;
  stopTimes: StopTime[];
  shapeId: string;
}

export interface Shape {
  shapeId: string;
  length: number;
  geom: {
    type: string;
    coordinates: [number, number];
  };
}
