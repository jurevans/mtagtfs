import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const LinesScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Lines</Text>
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
