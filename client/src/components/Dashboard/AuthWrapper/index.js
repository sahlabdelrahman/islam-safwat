/** @format */

import { Navigate, Outlet } from "react-router-dom";

import { IsExpired } from "../../../services/auth.service";

const AuthWrapper = () => {
  return IsExpired() ? <Navigate to="/login" /> : <Outlet />;
};

export default AuthWrapper;
