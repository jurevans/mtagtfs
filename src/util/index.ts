import { DateTime } from 'luxon';
import { IInterval } from 'interfaces';

const TIME_ZONE = 'America/New_York';

/**
 * Get human-readable time, 12 hour format, from interval
 * @param interval
 * @returns {string}
 */
export const getTimeFromInterval = (interval: IInterval): string => {
  const { hours: hour, minutes: minute, seconds: second } = interval;
  const time = DateTime.fromObject({
    hour,
    minute,
    second,
  })
    .setZone(TIME_ZONE)
    .toLocaleString(DateTime.TIME_SIMPLE);
  return time;
};
