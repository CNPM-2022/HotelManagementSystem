import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="container-fluid h1 p-5 text-center">
      {isAuth && <h2>Welcome {user.username}</h2>}
      <p>{isAuth ? "You are logged in" : "You are not logged in"}</p>
    </div>
  );
};

export default Home;
