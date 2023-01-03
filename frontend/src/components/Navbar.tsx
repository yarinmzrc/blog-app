import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const paths = [
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/sign-up" },
  { name: "Posts", path: "/posts" },
];

export const Navbar = () => {
  const location = useLocation();

  const getActiveLinkStyles = (path: string) => {
    return location.pathname === path && "text-purple-600";
  };

  return (
    <div className="w-full bg-white shadow-md flex justify-between items-center p-4 mb-3">
      <Link to="/">
        <div className="text-2xl font-medium">
          <span className="mx-1">
            <FontAwesomeIcon icon={faFilePen} />
          </span>
          BlogApp
        </div>
      </Link>
      <ul className="flex items-center justify-center text-lg gap-5">
        {paths.map((element) => (
          <Link
            key={element.path}
            className={`hover:text-purple-600 ${getActiveLinkStyles(
              element.path
            )}`}
            to={element.path}
          >
            {element.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};
