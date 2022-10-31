import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";

const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(authActions.logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="nav bg-dark d-flex justify-content-end py-2">
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
          <NavLink className="nav-link" to="/rooms">
            Rooms
          </NavLink>
          <NavDropdown className="link text-dark" title={user.username}>
            <NavDropdown.Item className="link-dark">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={logoutHandler} className="link-dark">
              <NavLink className="nav-link">Logout</NavLink>
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}
    </div>
  );
};

export default TopNav;
