import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  BLOG_APP_LOCAL_STORAGE_PREFIX,
  LOCAL_BASE_URL,
} from "../../constants/constants";
import {
  TEditPostQuery,
  TGetAllPostsResponse,
} from "../../constants/interfaces";
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
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<TGetAllPostsResponse[], void>({
      query: () => "/",
      providesTags: (result = []) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Posts" as const, _id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getPost: builder.query<TGetAllPostsResponse, string>({
      query: (postId: string) => `/${postId}`,
      providesTags: (arg) => [{ type: "Posts", _id: arg }],
    }),
    getPostsByCategory: builder.query<TGetAllPostsResponse[], string>({
      query: (category: string) => `/get-posts-by-category/${category}`,
    }),
    updatePost: builder.mutation<TGetAllPostsResponse, TEditPostQuery>({
      query: (credentials) => ({
        url: `/edit/${credentials.postId}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsByCategoryQuery,
  useGetAllPostsQuery,
  useGetPostQuery,
  useUpdatePostMutation,
} = postApi;
