import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

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
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(
          authActions.login({
            token: data.accessToken,
            user: data.user,
          })
        );
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return <LoginForm onLogin={loginHandler} />;
};

export default Login;
