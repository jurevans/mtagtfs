# MTA GTFS App

_Coming soon_

Required `.env` variables:
```bash
MAPBOX_ACCESS_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
GTFS_API_URL=http://localhost:4000/graphql
GTFS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
GTFS_REALTIME_API_URL=http://localhost:5000/graphql
GTFS_REALTIME_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

You will need to create an account with [MapBox](https://www.mapbox.com/) to obtain a `MAPBOX_ACCESS_TOKEN` to set in this file. The `GTFS_API_KEY` and `GTFS_REALTIME_API_KEY` must be valid to access the respective GraphQL APIs.
