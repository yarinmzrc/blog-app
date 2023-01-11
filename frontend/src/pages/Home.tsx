import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { PostCard } from "../components/PostCard";
import { PostContainer } from "../components/PostContainer";
import { TGetAllPostsResponse } from "../constants/interfaces";
import { useGetAllPostsQuery } from "../redux/api/authApi";
import { setError } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks/hooks";

export const Home = () => {
  const { isLoading, data: postsData, error, isError } = useGetAllPostsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError && error && "data" in error) {
      dispatch(setError({ error }));
    }
  }, [error, isError]);

  return isLoading ? (
    <Loader />
  ) : (
    <PostContainer title="Latest Posts">
      {postsData?.map((post: TGetAllPostsResponse) => (
        <PostCard key={post._id} post={post} />
      ))}
    </PostContainer>
  );
};
