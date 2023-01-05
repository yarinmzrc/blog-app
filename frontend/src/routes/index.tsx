import { Login } from "../pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { ProtectedRoute } from "./PrivateRoute";
import { PrivatePage } from "../pages/PrivatePage";
import { NotFound } from "../pages/NotFound";
import { useAppSelector } from "../redux/hooks/hooks";
import { selectAuth } from "../redux/features/authSlice";

export const AppRoutes = () => {
  const { user } = useAppSelector(selectAuth);

  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PrivatePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
