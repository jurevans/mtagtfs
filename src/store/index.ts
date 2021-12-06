import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import stopsReducer from 'slices/stops';
import tripsReducer from 'slices/trips';

const store = configureStore({
  reducer: {
    stops: stopsReducer,
    trips: tripsReducer,
  },
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
export const useAppDispatch: typeof useDispatch = () => useDispatch();

export default store;
