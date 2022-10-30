import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardNav = () => {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={`nav-link ${pathname === "/dashboard" && "active"}`}
          to="/dashboard"
        >
          Your Bookings
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/dashboard/seller"
          className={`nav-link ${pathname === "/dashboard/seller" && "active"}`}
        >
          Your Hotels
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
