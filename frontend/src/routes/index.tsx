import { Login } from "../pages/Login";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { ProtectedRoute } from "./PrivateRoute";
import { PrivatePage } from "../pages/PrivatePage";
import { NotFound } from "../pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/login" element={<Login />} />
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
