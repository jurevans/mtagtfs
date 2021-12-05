import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface Route {
  routeId: string;
  routeShortName: string;
  routeLongName: string;
  routeDesc: string;
  routeColor: string;
}

type Props = {
  route: Route;
};

const Route: FC<Props> = ({ route }) => {
  const { routeId, routeShortName, routeLongName, routeDesc, routeColor } =
    route;

  return (
    <View style={{ ...styles.view, borderColor: `#${routeColor}` }}>
      <Text>routeId: {routeId}</Text>
      <Text>routeShortName: {routeShortName}</Text>
      <Text>routeLongName: {routeLongName}</Text>
      <Text>routeDesc: {routeDesc}</Text>
      <Text>routeColor: {routeColor}</Text>
    </View>
  );
};

export default Route;
