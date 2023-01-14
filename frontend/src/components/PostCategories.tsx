import { Link } from "react-router-dom";
import { postCategories } from "../constants/constants";

export const PostCategories = () => {
  return (
    <section className="w-full px-10 md:px-20 xl:px-40 p-5 box-border flex gap-4 bg-white border-y border-y-slate-100">
      {postCategories.map((category) => (
        <Link
          key={category}
          className="hover:text-emerald-600 transition font-medium"
          to={`/posts/category/${category}`}
        >
          {category}
        </Link>
      ))}
    </section>
  );
};
