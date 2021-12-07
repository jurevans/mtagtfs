import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActiveStop {
  stopId: string;
  stopName: string;
  coordinates: [number, number];
}

interface InitialState {
  activeStop: ActiveStop | null;
}

const initialState: InitialState = {
  activeStop: null,
};

const stopSlice = createSlice({
  name: 'stop',
  initialState,
  reducers: {
    setActiveStop: (state, action: PayloadAction<ActiveStop>) => {
      state.activeStop = action.payload;
    },
  },
});

const { actions, reducer } = stopSlice;
export const { setActiveStop } = actions;
export default reducer;
