import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (username, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      if (data.success) {
        const user = {
          username: data.username,
          accessToken: data.accessToken,
          createdAt: data.createdAt,
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(
          authActions.login({
            token: data.accessToken,
            user: data.username,
          })
        );
        navigate("/dashboard");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container-fluid p-5">
      <h1 className="text-center">Login</h1>
      <LoginForm onLogin={loginHandler} />
    </div>
  );
};

export default Login;
