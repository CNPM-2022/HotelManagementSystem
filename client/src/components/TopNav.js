import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { toast } from "react-toastify";

const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(authActions.logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="nav bg-light d-flex justify-content-end">
      <NavLink className="nav-link" to="/">
        Home
      </NavLink>
      {!isAuthenticated && (
        <>
          <NavLink className="nav-link" to="/rooms">
            Rooms
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </>
      )}
      {isAuthenticated && (
        <>
          <NavLink className="nav-link" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="nav-link" to="/rooms">
            Rooms
          </NavLink>
          <a className="nav-link" onClick={logoutHandler}>
            LogOut
          </a>
        </>
      )}
    </div>
  );
};

export default TopNav;
