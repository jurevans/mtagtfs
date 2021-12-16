import React, { FC } from 'react';
import { StyleProp, Text, View } from 'react-native';

type Props = {
  message?: string;
  styles?: StyleProp<any>;
};

const ErrorView: FC<Props> = ({ message, styles = {} }) => {
  return (
    <View>
      <Text style={{ ...styles }}>
        {message || 'There was an error making the request!'}
      </Text>
    </View>
  );
};

export default ErrorView;
