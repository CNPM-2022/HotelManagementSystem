import React from "react";
import { NavLink } from "react-router-dom";
const TopNav = () => {
  return (
    <div className="nav bg-light d-flex justify-content-end">
      <NavLink className="nav-link" to="/">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
      <NavLink className="nav-link" to="/register">
        Register
      </NavLink>
    </div>
  );
};

export default TopNav;
