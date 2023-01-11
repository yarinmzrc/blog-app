import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AppRoutes } from "./routes";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import {
  clearError,
  logOutUser,
  selectAuth,
  setUser,
} from "./redux/features/authSlice";
import { useGetUserDetailsByTokenQuery } from "./redux/api/authApi";
import { useEffect } from "react";
import { Loader } from "./components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostCategories } from "./components/PostCategories";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectAuth);
  const { pathname } = useLocation();
  const { data, isSuccess, isLoading } = useGetUserDetailsByTokenQuery();

  useEffect(() => {
    if (isSuccess) {
      if (data?.token && data.user) {
        dispatch(setUser({ user: data?.user, token: data?.token }));
      } else {
        dispatch(logOutUser());
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
        theme: "light",
      });
      dispatch(clearError());
    }
  }, [error]);

  const showCategories =
    pathname !== "/login" && pathname !== "/sign-up" ? <PostCategories /> : "";

  return (
    <div className="App flex flex-col">
      <Navbar />
      {showCategories}
      <ToastContainer />
      <div className="info-container w-full flex-grow flex items-center justify-center">
        {isLoading ? <Loader /> : <AppRoutes />}
      </div>
      <Footer />
      <svg id="wave" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#A7F0BA"
          fillOpacity="0.2"
          d="M19.1,-33.3C27.7,-24.3,39.4,-23.8,47,-18.3C54.5,-12.7,57.7,-1.9,52.9,5.2C48.1,12.3,35.3,15.9,27.2,21.4C19,26.9,15.6,34.3,8.7,42C1.7,49.7,-8.8,57.7,-15.8,55.1C-22.9,52.5,-26.5,39.3,-32,29.6C-37.5,19.9,-44.8,13.7,-46,6.5C-47.1,-0.6,-42.1,-8.8,-40.7,-21.5C-39.4,-34.1,-41.7,-51.4,-35.6,-61.4C-29.4,-71.5,-14.7,-74.4,-4.7,-67.1C5.3,-59.8,10.6,-42.3,19.1,-33.3Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}

export default App;
