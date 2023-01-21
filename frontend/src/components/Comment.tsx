import { TComment } from "../constants/interfaces";
import { formatDate } from "../utils";

export const Comment = ({ userId, text, createdAt }: TComment) => {
  return (
    <div className="flex flex-col p-4 max-w-lg border border-gray-300 rounded-lg">
      <div className="flex items-center gap-2">
        <h2 className="font-medium">{userId.name}</h2>{" "}
        <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
};
