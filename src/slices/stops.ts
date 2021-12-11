import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IActiveStop {
  feedIndex: number;
  stopId: string;
}

interface InitialState {
  activeStop: IActiveStop | null;
}

const initialState: InitialState = {
  activeStop: null,
};

const stopSlice = createSlice({
  name: 'stop',
  initialState,
  reducers: {
    setActiveStop: (state, action: PayloadAction<IActiveStop>) => {
      state.activeStop = action.payload;
    },
  },
});

const { actions, reducer } = stopSlice;
export const { setActiveStop } = actions;
export default reducer;
