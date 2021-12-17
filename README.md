# MTA GTFS App

### Table of Contents
- [About](#about)
- [Set-up](#set-up)
  - [MapBox](#mapbox)
  - [API Gateway](#api-gateway)
  - [Running Metro](#running-metro)
- [Notes](#notes)

## About

This project aims to be a fully featured iOS and Android public transit application. It utilizes the GTFS feed data served via a GraphQL API for the NYC MTA (primarily), serving subway, Long Island Railroad, Metro North Rail, buses in all five boroughs, and will include NYC Ferry, as well as other data sources. See the following projects to learn about the APIs that power this app:

GTFS GraphQL API:
https://github.com/jurevans/gtfs-graphql-api/

GTFS-Realtime GraphQL API:
https://github.com/jurevans/gtfs-realtime-graphql-api/

[ [Table of Contents](#table-of-contents) ]

## Set-up

The following `.env` variables are required to build this app:

```bash
MAPBOX_ACCESS_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
GTFS_API_GATEWAY_URL=http://localhost:4000/graphql
GTFS_API_GATEWAY_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### MapBox

This app uses MapBox, and will need a valid key to load the map. You will need to create an account with [MapBox](https://www.mapbox.com/) to obtain a `MAPBOX_ACCESS_TOKEN` to set in this file.

You will also need to add a "downloads API" token to the `/android/gradle.properties`, like so:

```bash
# Key for MapBox Downloads API
MAPBOX_DOWNLOADS_TOKEN=XXXXXXXXXXXXXXXXXX
```

### API Gateway

The `GTFS_API_GATEWAY_URL` and `GTFS_API_GATEWAY_KEY` must be valid to access the GraphQL API. Presently, only the [gtfs-graphql-api](https://github.com/jurevans/gtfs-graphql-api/) and [gtfs-realtime-graphql-api](https://github.com/jurevans/gtfs-realtime-graphql-api/) APIs are in place, but an API gateway merging these schemas is being developed that will serve this app.

### Running Metro

This project requires the `react-native-cli`. Starting up Metro and launching the emulator is straightforward, assuming that your environment has been configured according to the [React Native environment setup docs](https://reactnative.dev/docs/environment-setup):

```bash
# Start metro (in a separate terminal)
npm start
# OR
npx react-native start

# Launch app on Android
npm run android
# OR
npx react-native run-android

# Launch on iOS
npm run ios
# OR
npx react-native run-ios
```

[ [Table of Contents](#table-of-contents) ]

## Notes

Read more about the frameworks and libraries this app utilizes at the links below:

- [React-Native](https://reactnative.dev/)
- [React Native Navigation](https://wix.github.io/react-native-navigation/)
- [React Native Navigation Hooks](https://underscopeio.github.io/react-native-navigation-hooks/)
- [React Native MapboxGL](https://github.com/react-native-mapbox-gl/)
- [MapBox](https://www.mapbox.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ApolloClient](https://www.apollographql.com/docs/react/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Turfjs](https://github.com/Turfjs/turf)

[ [Table of Contents](#table-of-contents) ]
