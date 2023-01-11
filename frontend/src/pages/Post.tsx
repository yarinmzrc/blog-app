import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useGetPostQuery } from "../redux/api/authApi";
import { selectAuth, setMessage } from "../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
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
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    if (isError && error && "data" in error) {
      dispatch(setMessage({ data: error.data, isError: true }));
    }
  }, [error, isError]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full h-full flex flex-col gap-10 py-10 px-40">
      <div className="flex justify-between">
        <div className="flex gap-8">
          <p>{post?.userId.name}</p>
          <p>{post?.category}</p>
          <p>{formatDate(post?.createdAt || "")}</p>
        </div>
        {user && user._id === post?.userId._id ? <button>Edit</button> : ""}
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
