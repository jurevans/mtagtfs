import React, { FC } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export type StopTimeCallback = (args: {
  feedIndex: number;
  tripId: string;
  stopId: string;
}) => void;

export interface IStopTimeStyles {
  button?: StyleProp<ViewStyle>;
  label?: StyleProp<TextStyle>;
  departure?: StyleProp<TextStyle>;
}

type Props = {
  feedIndex: number;
  tripId: string;
  stopId: string;
  stopName: string;
  departure: string;
  buttonStyles?: StyleProp<ViewStyle>;
  labelStyles?: StyleProp<TextStyle>;
  departureStyles?: StyleProp<TextStyle>;
  onPress: StopTimeCallback;
};

const StopTimeButton: FC<Props> = ({
  feedIndex,
  tripId,
  stopId,
  stopName,
  departure,
  buttonStyles = {},
  labelStyles = {},
  departureStyles = {},
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={() => onPress({ feedIndex, stopId, tripId })}>
      <Text style={labelStyles}>{stopName}</Text>
      <Text style={departureStyles}>Departs at: {departure}</Text>
    </TouchableOpacity>
  );
};

export default StopTimeButton;
