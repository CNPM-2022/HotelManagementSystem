import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

//import toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Regiter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerHandler = async (username, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
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
        dispatch(authActions.register());
        toast.success(data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container-fluid p-5">
      <h1 className="text-center">Register</h1>
      <RegisterForm onRegister={registerHandler} />
    </div>
  );
};

export default Regiter;
