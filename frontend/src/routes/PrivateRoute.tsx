import { Navigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { TProtectedRoute } from "../constants/interfaces";
import { useRequireUserAuthQuery } from "../redux/reducers/authApi";

export const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const { isSuccess, error, isLoading } = useRequireUserAuthQuery();

  if (isLoading) return <Loader />;

  if (!isSuccess || error) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
