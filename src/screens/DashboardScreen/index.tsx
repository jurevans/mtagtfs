import React from 'react';
import { Text, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import styles from './styles';

const DashboardScreen: NavigationFunctionComponent = () => {
  return (
    <View style={styles.root}>
      <Text>Dashboard</Text>
    </View>
  );
};

export default DashboardScreen;
