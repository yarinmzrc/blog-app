import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// Define a type for the slice state
interface userInterface {
  name?: string;
  email?: string;
}
interface userState {
  user: userInterface;
}

// Define the initial state using that type
const initialState: userState = {
  user: {},
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userInterface>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
