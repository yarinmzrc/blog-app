import { useNavigate } from "react-router-dom";
import { TPostCard } from "../constants/interfaces";
import { formatDate } from "../utils";

const categoryColor = {
  Programming: "border-t-indigo-900",
  Data: "border-t-rose-900",
  Lifestyle: "border-t-cyan-900",
};

export const PostCard = ({
  title,
  body,
  id,
  category,
  createdAt,
  postCreator,
}: TPostCard) => {
  const navigate = useNavigate();

  const handleClickOnPost = (id: string) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div
      onClick={() => handleClickOnPost(id)}
      className="flex rounded-lg shadow-md hover:scale-105 transition-all cursor-pointer"
    >
      <div
        className={`flex flex-col gap-2 p-3 justify-center rounded-l-md border-t-4 ${categoryColor[category]}`}
      >
        <p className="text-grey-300 text-sm">{postCreator}</p>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-md">{body.substring(0, 80) + "..."}</p>
        <div className="flex items-center gap-4">
          <p className="text-xs">{formatDate(createdAt)}</p>
          <p className="text-xs px-3 py-1 rounded-xl bg-slate-300 text-white">
            {category}
          </p>
        </div>
      </div>
      <div className="w-1/3 overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-r-lg"
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          alt="blog post"
        />
      </div>
    </div>
  );
};
