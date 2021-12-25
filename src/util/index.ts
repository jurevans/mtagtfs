/**
 * Calculate radius within which to fetch stops
 * @param zoom
 * @param lat
 * @returns {number}
 */
export const getRadiusByZoomLat = (zoom: number, lat: number): number => {
  const CIRCUMFERENCE = 40075016.686;
  return (CIRCUMFERENCE * Math.cos(lat)) / 2 ** zoom / 100000;
};
