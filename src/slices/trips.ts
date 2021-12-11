import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IActiveTrip {
  feedIndex: number;
  tripId: string;
  shapeId: string;
  routeId: string;
}

interface InitialState {
  activeTrip: IActiveTrip | null;
}

const initialState: InitialState = {
  activeTrip: null,
};

const TripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setActiveTrip: (state, action: PayloadAction<IActiveTrip>) => {
      state.activeTrip = action.payload;
    },
  },
});

const { actions, reducer } = TripSlice;
export const { setActiveTrip } = actions;
export default reducer;
