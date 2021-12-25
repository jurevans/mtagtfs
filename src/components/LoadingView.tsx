import React, { FC } from 'react';
import { StyleProp, Text, View } from 'react-native';

interface Props {
  message?: string;
  styles?: StyleProp<any>;
}

const LoadingView: FC<Props> = ({ message, styles = {} }) => {
  return (
    <View>
      <Text style={{ ...styles }}>{message || 'Loading...'}</Text>
    </View>
  );
};

export default React.memo(LoadingView);
