/* eslint-disable react/jsx-pascal-case */
import { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom"

import Nav from './Nav.js'
import Sidebar from './Sidebar.js';
import Footer from './Footer.js';
import Edit_profile from './Edit_profile.js';
import User_infor from './User_infor'
/* import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.min.css'; */
import "./Profile.scss"



function App() {
  return (
    <Fragment>
      <div className="container">
        <Nav />
      </div>
      <div className="wrapper d-flex align-items-stretch">
        <Sidebar />
        <div id="content" className="p-4 p-md-5 pt-5" style={{ backgroundColor: "#eee" }}>
          <section className="mt-3" style={{ backgroundColor: "#eee" }}>
            <div className="container">
              <div className="row">
                <Outlet />
              </div>
            </div>
          </section>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
