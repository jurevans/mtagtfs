import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IActiveStop {
  feedIndex: number;
  tripId: string;
  stopId: string;
}

export interface ITransferPayload {
  stopId: string;
  transfers: string[];
}

export type TransfersIndex = {
  [key: string]: string[];
};

interface InitialState {
  activeStop: IActiveStop | null;
  transfers: TransfersIndex;
}

const initialState: InitialState = {
  activeStop: null,
  transfers: {},
};

const stopSlice = createSlice({
  name: 'stop',
  initialState,
  reducers: {
    setActiveStop: (state, action: PayloadAction<IActiveStop>) => {
      state.activeStop = action.payload;
    },
    setTransfers: (state, action: PayloadAction<ITransferPayload>) => {
      const { stopId, transfers } = action.payload;

      if (!(stopId in state.transfers)) {
        state.transfers[stopId] = transfers;
      }
    },
  },
});

const { actions, reducer } = stopSlice;
export const { setActiveStop } = actions;
export default reducer;
