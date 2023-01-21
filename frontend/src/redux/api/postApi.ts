import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  BLOG_APP_LOCAL_STORAGE_PREFIX,
  LOCAL_BASE_URL,
} from "../../constants/constants";
import {
  TAddComment,
  TComment,
  TEditPostQuery,
  TGetPostResponse,
  TPost,
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
    getAllPosts: builder.query<TPost[], void>({
      query: () => "/",
      providesTags: (result = []) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Posts" as const, _id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getPost: builder.query<TGetPostResponse, string>({
      query: (postId: string) => `/${postId}`,
      providesTags: (arg) => [{ type: "Posts", _id: arg }],
    }),
    getPostsByCategory: builder.query<TPost[], string>({
      query: (category: string) => `/get-posts-by-category/${category}`,
    }),
    getPostsByUserId: builder.query<TPost[], string>({
      query: (userId: string) => `/get-posts-by-user-id/${userId}`,
    }),
    updatePost: builder.mutation<TPost, TEditPostQuery>({
      query: (credentials) => ({
        url: `/edit/${credentials.postId}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Posts"],
    }),
    addComment: builder.mutation<TComment, TAddComment>({
      query: (credentials) => ({
        url: `/add-comment/${credentials.userId}/${credentials.postId}`,
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
  useGetPostsByUserIdQuery,
  useAddCommentMutation,
} = postApi;
