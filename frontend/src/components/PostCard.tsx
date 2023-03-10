import { useNavigate } from "react-router-dom";
import { defaultImageSrc } from "../constants/constants";
import { TPostCard } from "../constants/interfaces";
import { formatDate } from "../utils";

const categoryColor = {
  Programming: "bg-indigo-900",
  Data: "bg-rose-900",
  Lifestyle: "bg-cyan-900",
};

export const PostCard = ({ post }: TPostCard) => {
  const { title, body, _id, category, createdAt, userId } = post;
  const navigate = useNavigate();

  const handleClickOnPost = (id: string) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div
      onClick={() => handleClickOnPost(_id)}
      className="flex flex-col rounded-lg shadow-md w-96 sm:w-64 hover:scale-105 transition-all cursor-pointer"
    >
      <div className="w-full h-40 overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={post.image || defaultImageSrc}
          alt="blog post"
        />
      </div>
      <div
        className={`flex flex-col bg-white gap-2 p-3 justify-center rounded-b-md border-b-4 border-b-emerald-700`}
      >
        <p className="text-grey-300 text-xs">{userId.name}</p>
        <h3 className="font-bold text-md">{title}</h3>
        <p className="text-xs">{body.substring(0, 60) + "..."}</p>
        <p className="text-xs">{formatDate(createdAt)}</p>
        <p
          className={`text-xs px-3 py-1 rounded-xl w-max ${categoryColor[category]} text-white`}
        >
          {category}
        </p>
      </div>
    </div>
  );
};
