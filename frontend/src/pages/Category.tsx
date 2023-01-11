import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { PostCard } from "../components/PostCard";
import { PostContainer } from "../components/PostContainer";
import { useGetPostsByCategoryQuery } from "../redux/api/authApi";
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

  return (
    <PostContainer title={category}>
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </PostContainer>
  );
};
