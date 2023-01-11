import { Login } from "../pages/Login";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { ProtectedRoute } from "./PrivateRoute";
import { PrivatePage } from "../pages/PrivatePage";
import { NotFound } from "../pages/NotFound";
import { Home } from "../pages/Home";
import { Post } from "../pages/Post";
import { Category } from "../pages/Category";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:postId" element={<Post />} />
      <Route path="/posts/category/:category" element={<Category />} />
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
