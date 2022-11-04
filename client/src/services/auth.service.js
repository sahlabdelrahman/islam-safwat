/** @format */

import { useDispatch } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { logout as logoutActionCreator } from "../store/actions/auth.action";
import authHeader from "./auth-header.service";

const login = async (email, password) => {
  return await axios
    .post(`api/user/login`, {
      email,
      password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
};
const register = async (email, password) => {
  return await axios
    .post(`api/user/register`, {
      email,
      password,
    })
    .then((res) => console.log(res.data));
};

const changePassword = async (oldPassword, newPassword, email) => {
  return await axios.put(
    `api/user/change-password`,
    { oldPassword, newPassword, email },
    { headers: authHeader() }
  );
};

const logout = () => {
  localStorage.removeItem("user");
};

export const IsExpired = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  if (user) {
    const token = user.token;
    const { exp } = jwt_decode(token);
    if (exp < Date.now() / 1000) {
      dispatch(logoutActionCreator());
      return true;
    }
  }

  return false;
};

const AuthService = { login, logout, changePassword, register };

export default AuthService;
