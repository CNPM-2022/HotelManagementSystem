import React from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid my-4">
        <DashboardNav />
      </div>
      <div className="container my-2">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Hotels</h2>
          </div>
          <div className="col-md-2">
            <Link to="/" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
