export interface IFeedConfig {
  feedIndex: number;
  label: string;
}

type IConfig = {
  feeds: {
    [key: string]: IFeedConfig;
  };
};

const config: IConfig = {
  feeds: {
    1: {
      feedIndex: 1,
      label: 'Subway',
    },
    2: {
      feedIndex: 2,
      label: 'Bronx buses',
    },
    3: {
      feedIndex: 3,
      label: 'Brooklyn buses',
    },
    4: {
      feedIndex: 4,
      label: 'Manhattan buses',
    },
    5: {
      feedIndex: 5,
      label: 'Queens buses',
    },
    6: {
      feedIndex: 6,
      label: 'Staten Island buses',
    },
    7: {
      feedIndex: 7,
      label: 'Long Island Railroad',
    },
    8: {
      feedIndex: 8,
      label: 'Metro-North Railroad',
    },
  },
};

export default config;
