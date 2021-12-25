import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import StopTimeButton, {
  IStopTimeStyles,
  StopTimeCallback,
} from 'components/StopTimeButton';
import { IStopTime } from 'interfaces';

interface Props {
  tripId: string;
  stopTimes: IStopTime[];
  styles?: IStopTimeStyles;
  onPress: StopTimeCallback;
}

const getRenderItem = (
  tripId: string,
  stopTime: IStopTime,
  styles: IStopTimeStyles,
  onPress: StopTimeCallback,
) => {
  const { stop, departure } = stopTime;
  const { feedIndex, stopId, parentStation, stopName } = stop;
  return (
    <StopTimeButton
      feedIndex={feedIndex}
      tripId={tripId}
      stopId={parentStation || stopId}
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
      keyExtractor={(stopTime: IStopTime) => {
        const { feedIndex, stopId, parentStation } = stopTime.stop;
        return `${feedIndex}:${parentStation || stopId}`;
      }}
    />
  );
};

export default React.memo(TripList);
