import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { logOutUser, selectAuth } from "../redux/features/authSlice";

export const Navbar = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const paths = [
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/sign-up" },
  ];

  const getActiveLinkStyles = (path: string) => {
    return location.pathname === path && "text-purple-600";
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <div className="w-full bg-white border border-b-gray-200 flex justify-between items-center p-8 px-40 mb-3">
      <Link to="/">
        <div className="text-2xl font-medium">
          <span className="mx-1">
            <FontAwesomeIcon icon={faFilePen} />
          </span>
          BlogApp
        </div>
      </Link>
      <ul className="flex items-center justify-center text-lg gap-5">
        {user ? (
          <button className="hover:text-purple-600" onClick={handleLogOut}>
            Logout
          </button>
        ) : (
          paths.map((element) => (
            <Link
              key={element.path}
              className={`hover:text-purple-600 ${getActiveLinkStyles(
                element.path
              )}`}
              to={element.path}
            >
              {element.name}
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};
