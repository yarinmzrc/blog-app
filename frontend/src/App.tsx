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

function App() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectAuth);
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

  return (
    <div className="App flex flex-col">
      <Navbar />
      <ToastContainer className="!bottom-8" />
      <div className="container flex-grow flex items-center justify-center">
        {isLoading ? <Loader /> : <AppRoutes />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
