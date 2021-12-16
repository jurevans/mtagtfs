import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import StopTimeButton, {
  IStopTimeStyles,
  StopTimeCallback,
} from 'components/StopTimeButton';
import { IStopTime } from 'interfaces';

type Props = {
  tripId: string;
  stopTimes: IStopTime[];
  styles?: IStopTimeStyles;
  onPress: StopTimeCallback;
};

const getRenderItem = (
  tripId: string,
  stopTime: IStopTime,
  styles: IStopTimeStyles,
  onPress: StopTimeCallback,
) => {
  const { stop, departure } = stopTime;
  const { feedIndex, stopId, stopName } = stop;
  return (
    <StopTimeButton
      feedIndex={feedIndex}
      tripId={tripId}
      stopId={stopId}
      stopName={stopName}
      departure={departure}
      buttonStyles={styles.button}
      labelStyles={styles.label}
      departureStyles={styles.departure}
      onPress={onPress}
    />
  );
};

const TripList: FC<Props> = ({ tripId, stopTimes, styles = {}, onPress }) => {
  return (
    <FlatList
      data={stopTimes}
      renderItem={({ item }: ListRenderItemInfo<IStopTime>) =>
        getRenderItem(tripId, item, styles, onPress)
      }
      keyExtractor={(stopTime: IStopTime) => stopTime.stop.stopId}
    />
  );
};

export default TripList;
