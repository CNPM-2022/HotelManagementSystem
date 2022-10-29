import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="container-fluid h1 p-5 text-center">
      <h1>Home</h1>
      <p>{isAuth ? "You are logged in" : "You are not logged in"}</p>
    </div>
  );
};

export default Home;
