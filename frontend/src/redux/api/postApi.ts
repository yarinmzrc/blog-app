import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  BLOG_APP_LOCAL_STORAGE_PREFIX,
  LOCAL_BASE_URL,
} from "../../constants/constants";
import { TGetAllPostsResponse } from "../../constants/interfaces";
import { RootState } from "../store/store";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${LOCAL_BASE_URL}/posts`,
    prepareHeaders: (headers, { getState }) => {
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
    getAllPosts: builder.query<TGetAllPostsResponse[], void>({
      query: () => "/",
    }),
    getPost: builder.query<TGetAllPostsResponse, string>({
      query: (postId: string) => `/${postId}`,
    }),
    getPostsByCategory: builder.query<TGetAllPostsResponse[], string>({
      query: (category: string) => `/get-posts-by-category/${category}`,
    }),
  }),
});

export const {
  useGetPostsByCategoryQuery,
  useGetAllPostsQuery,
  useGetPostQuery,
} = postApi;
