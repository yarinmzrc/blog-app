import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AppRoutes } from "./routes";
import { useAppDispatch } from "./redux/hooks/hooks";
import { setUser } from "./redux/features/authSlice";
import { useGetUserDetailsByTokenQuery } from "./redux/reducers/authApi";
import { useEffect } from "react";
import { Loader } from "./components/Loader";

function App() {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading } = useGetUserDetailsByTokenQuery();

  useEffect(() => {
    if (isSuccess) {
      if (data?.token && data.user) {
        dispatch(setUser({ user: data?.user, token: data?.token }));
      }
    }
  }, [isSuccess]);

  if (isLoading) return <Loader />;

  return (
    <div className="App flex flex-col">
      <Navbar />
      <div className="container flex-grow items-center justify-center">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
