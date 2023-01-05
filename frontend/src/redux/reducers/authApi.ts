import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LOCAL_BASE_URL,
  BLOG_APP_LOCAL_STORAGE_PREFIX,
} from "../../constants/constants";
import {
  TLoginUser,
  TRequireAuthResponse,
  TUserSignUp,
  userState,
} from "../../constants/interfaces";
import { RootState } from "../store/store";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: LOCAL_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const user =
        (getState() as RootState).auth.token ||
        JSON.parse(
          localStorage.getItem(`${BLOG_APP_LOCAL_STORAGE_PREFIX}-user`) || "{}"
        );
      if (typeof user === "string") {
        headers.set("authorization", `Bearer ${user}`);
      } else {
        headers.set("authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<userState, TLoginUser>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<TRequireAuthResponse, TUserSignUp>({
      query: (credentials) => ({
        url: "sign-up",
        method: "POST",
        body: credentials,
      }),
    }),
    requireUserAuth: builder.query<userState, void>({
      query: () => "auth",
    }),
    getUserDetailsByToken: builder.query<userState, void>({
      query: () => "users/get-user-by-token",
    }),
    //get-user-by-token
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRequireUserAuthQuery,
  useLoginMutation,
  useSignUpMutation,
  useGetUserDetailsByTokenQuery,
} = authApi;
