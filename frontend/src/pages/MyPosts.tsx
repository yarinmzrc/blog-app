import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import { PostCard } from "../components/PostCard";
import { useGetPostsByUserIdQuery } from "../redux/api/postApi";
import { selectAuth } from "../redux/features/authSlice";
import { useAppSelector } from "../redux/hooks/hooks";

export const MyPosts = () => {
  const { user } = useAppSelector(selectAuth);
  const { data: userPosts, isLoading } = useGetPostsByUserIdQuery(
    user?._id || ""
  );

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <h1 className="text-xl font-medium">Your Posts:</h1>
      {userPosts?.map((post, index) => (
        <Link to={`/posts/${post._id}`} key={post._id}>
          <span>{index + 1}</span>
          {". "}
          <span className="underline">{post.title}</span>
        </Link>
      ))}
    </div>
  );
};
