import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tempSlice = createSlice({
  name: 'temp',
  initialState: { message: 'It worked!' },
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

const { actions, reducer } = tempSlice;
export const { setMessage } = actions;
export default reducer;
