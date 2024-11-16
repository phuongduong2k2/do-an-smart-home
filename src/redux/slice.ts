import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
  insets?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
}

// Define the initial state using that type
const initialState: CounterState = {
  insets: undefined,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSafeAreaInsets: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const {setSafeAreaInsets} = appSlice.actions;
export default appSlice.reducer;
