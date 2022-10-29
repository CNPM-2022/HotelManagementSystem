import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const loginHandler = (email, password) => {
    console.log(email, password);
    navigate("/");
  };
  return (
    <div className="container-fluid p-5">
      <LoginForm onLogin={loginHandler} />
    </div>
  );
};

export default Login;
