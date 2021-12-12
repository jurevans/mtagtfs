import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import StopTime, {
  IStopTimeStyles,
  StopTimeCallback,
} from 'components/StopTime';
import { IStopTime } from 'interfaces';

type Props = {
  stopTimes: IStopTime[];
  styles?: IStopTimeStyles;
  onPress: StopTimeCallback;
};

const getRenderItem = (
  stopTime: IStopTime,
  styles: IStopTimeStyles,
  onPress: StopTimeCallback,
) => {
  const { stop, departureTime } = stopTime;
  const { feedIndex, stopId, stopName } = stop;
  return (
    <StopTime
      feedIndex={feedIndex}
      stopId={stopId}
      stopName={stopName}
      departureTime={departureTime}
      buttonStyles={styles.button}
      labelStyles={styles.label}
      departureStyles={styles.departure}
      onPress={onPress}
    />
  );
};

const Trip: FC<Props> = ({ stopTimes, styles = {}, onPress }) => {
  return (
    <FlatList
      data={stopTimes}
      renderItem={({ item }: ListRenderItemInfo<IStopTime>) =>
        getRenderItem(item, styles, onPress)
      }
      keyExtractor={(stopTime: IStopTime) => stopTime.stop.stopId}
    />
  );
};

export default Trip;
