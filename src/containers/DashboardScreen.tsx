import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

export const DashboardScreen: NavigationFunctionComponent = () => {
  return (
    <View style={styles.root}>
      <Text>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});
