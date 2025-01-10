import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
  insets?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  ipAddress?: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  insets: undefined,
  ipAddress: '192.168.136.182:5000',
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSafeAreaInsets: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    setIpAddress: (state, action) => {
      state.ipAddress = action.payload;
    },
  },
});

export const {setSafeAreaInsets, setIpAddress} = appSlice.actions;
export default appSlice.reducer;
