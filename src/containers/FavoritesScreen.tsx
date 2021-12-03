import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const FavoritesScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Favorites</Text>
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
