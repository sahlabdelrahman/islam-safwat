/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import { Container } from "@mui/material";

import { login } from "../../store/actions/auth.action";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../store/actions/ui.action";

import "../../css/Login/index.css";
import Spinner from "../../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.message);

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {}, [message]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(email.toLocaleLowerCase(), password))
      .then(() => {
        dispatch(showSuccessSnackbar("Login successfully."));
        navigate("/");
      })
      .catch((message) => {
        dispatch(showErrorSnackbar(message));
        setLoading(false);
      });
  };

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <Container className="login">
      {loading ? <Spinner /> : ""}
      <form onSubmit={handleLogin}>
        <div>
          <h2>Log in to your account</h2>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            minLength={6}
            maxLength={30}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            maxLength={30}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
