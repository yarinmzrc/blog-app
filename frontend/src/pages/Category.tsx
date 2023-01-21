import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { PostCard } from "../components/PostCard";
import { PostContainer } from "../components/PostContainer";
import { TGetAllPostsResponse } from "../constants/interfaces";
import { useGetPostsByCategoryQuery } from "../redux/api/postApi";
import { setMessage } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks/hooks";

export const Category = () => {
  const { category } = useParams();
  const {
    data: posts,
    isLoading,
    error,
    isError,
  } = useGetPostsByCategoryQuery(category || "");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError && error && "data" in error) {
      dispatch(setMessage({ data: error.data, isError: true }));
    }
  }, [error, isError]);

  if (isLoading) return <Loader />;

  if (posts?.length === 0) return <h1>Sorry, this category has no posts.</h1>;

  return (
    <PostContainer title={category}>
      {posts?.map((post: TGetAllPostsResponse) => (
        <PostCard key={post._id} post={post} />
      ))}
    </PostContainer>
  );
};
