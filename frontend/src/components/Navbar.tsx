import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
  logOutUser,
  selectAuth,
  setMessage,
} from "../redux/features/authSlice";
import "../App.css";

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
    return location.pathname === path && "text-emerald-600";
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/");
    dispatch(
      setMessage({ data: "You signed out successfully", isError: false })
    );
  };

  const userExistsInfo = (
    <div className="flex gap-x-6">
      <p className="text-emerald-500">{user?.name}</p>
      <button className="hover:text-emerald-600" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );

  return (
    <div className="nav-media-padding w-full bg-white sticky top-0 z-30 flex justify-between items-center p-8 px-10 md:px-20 xl:px-40">
      <Link to="/">
        <p className="text-2xl font-medium italic text-emerald-600 hover:text-emerald-700">
          Blogs.
        </p>
      </Link>
      <ul className="flex items-center justify-center text-lg gap-5">
        {user
          ? userExistsInfo
          : paths.map((element) => (
              <Link
                key={element.path}
                className={`hover:text-emerald-600 ${getActiveLinkStyles(
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
