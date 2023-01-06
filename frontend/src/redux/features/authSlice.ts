import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BLOG_APP_LOCAL_STORAGE_PREFIX } from "../../constants/constants";
import { userInterface, userState } from "../../constants/interfaces";
import { authApi } from "../api/authApi";
import type { RootState } from "../store/store";

// Define the initial state using that type
export const initialState: userState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: userInterface; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    setUser: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: userInterface; token: string }>
    ) => {
      localStorage.setItem(
        `${BLOG_APP_LOCAL_STORAGE_PREFIX}-user`,
        JSON.stringify({
          name: user?.name,
          token: token,
        })
      );
      state.user = user;
      state.token = token;
    },
    logOutUser: (state) => {
      localStorage.removeItem(`${BLOG_APP_LOCAL_STORAGE_PREFIX}-user`);
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    );
  },
});

export const { setUser, setCredentials, logOutUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
