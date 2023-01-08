import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useGetPostQuery } from "../redux/api/authApi";
import { setError } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks/hooks";
import { formatDate } from "../utils";

export const Post = () => {
  const { postId } = useParams();
  const {
    isLoading,
    data: post,
    isError,
    error,
  } = useGetPostQuery(postId || "");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError && error && "data" in error) {
      dispatch(setError({ error }));
    }
  }, [error, isError]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full h-full flex flex-col gap-10 py-10 px-40">
      <div className="flex gap-8">
        <p>{post?.userId.name}</p>
        <p>{post?.category}</p>
        <p>{formatDate(post?.createdAt || "")}</p>
      </div>
      <h1 className="text-4xl font-bold">{post?.title}</h1>
      <img
        className="max-w-xl object-cover rounded-r-lg"
        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
        alt="blog post"
      />
      <section>{post?.body}</section>
    </div>
  );
};
