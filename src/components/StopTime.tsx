import React, { FC } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { IInterval } from 'interfaces';
import { getTimeFromInterval } from 'util/';

export type StopTimeCallback = (args: {
  feedIndex: number;
  stopId: string;
}) => void;

export interface IStopTimeStyles {
  button?: StyleProp<ViewStyle>;
  label?: StyleProp<TextStyle>;
  departure?: StyleProp<TextStyle>;
}

type Props = {
  feedIndex: number;
  stopId: string;
  stopName: string;
  departureTime: IInterval;
  buttonStyles?: StyleProp<ViewStyle>;
  labelStyles?: StyleProp<TextStyle>;
  departureStyles?: StyleProp<TextStyle>;
  onPress: StopTimeCallback;
};

const StopTime: FC<Props> = ({
  feedIndex,
  stopId,
  stopName,
  departureTime,
  buttonStyles = {},
  labelStyles = {},
  departureStyles = {},
  onPress,
}) => {
  const time = getTimeFromInterval(departureTime);

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={() => onPress({ feedIndex, stopId })}>
      <Text style={labelStyles}>{stopName}</Text>
      <Text style={departureStyles}>Departs at: {time}</Text>
    </TouchableOpacity>
  );
};

export default StopTime;
