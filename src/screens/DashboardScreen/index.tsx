import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const DashboardScreen: FC = () => {
  return (
    <View style={styles.root}>
      <Text>Dashboard</Text>
    </View>
  );
};

export default DashboardScreen;
