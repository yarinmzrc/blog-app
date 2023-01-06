import { Navigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { TProtectedRoute } from "../constants/interfaces";
import { useGetUserDetailsByTokenQuery } from "../redux/api/authApi";

export const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const { isSuccess, error, isLoading } = useGetUserDetailsByTokenQuery();

  if (isLoading) return <Loader />;

  if (!isSuccess || error) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
