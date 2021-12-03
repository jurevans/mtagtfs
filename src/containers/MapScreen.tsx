import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const MapScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Map</Text>
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
