import { Screens } from 'navigation/screens';
import React, { FC, useContext } from 'react';
import { Button, Text, View } from 'react-native';
import {
  NavigationContext,
  useNavigation,
} from 'react-native-navigation-hooks';
import styles from './styles';

const DashboardScreen: FC = () => {
  const { componentId } = useContext(NavigationContext);
  const { push } = useNavigation();
  return (
    <View style={styles.root}>
      <Text>Dashboard: {componentId}</Text>
      <Button
        title="Settings"
        onPress={() => {
          push(Screens.SETTINGS_SCREEN, { test: 'This is a test.' });
        }}
      />
    </View>
  );
};

export default DashboardScreen;
