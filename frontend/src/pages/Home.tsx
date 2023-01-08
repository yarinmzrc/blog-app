import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { PostCard } from "../components/PostCard";
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
    <div className="flex flex-col flex-wrap justify-center w-full items-center gap-10 max-w-3xl my-6">
      {postsData?.map((post: TGetAllPostsResponse) => (
        <PostCard
          key={post._id}
          postCreator={post.userId.name}
          category={post.category}
          title={post.title}
          body={post.body}
          id={post._id}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
};
