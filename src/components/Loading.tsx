import React, { FC } from 'react';
import { StyleProp, Text, View } from 'react-native';

type Props = {
  message?: string;
  styles?: StyleProp<any>;
};

const Loading: FC<Props> = ({ message, styles = {} }) => {
  return (
    <View>
      <Text style={{ ...styles }}>{message || 'Loading...'}</Text>
    </View>
  );
};

export default Loading;
