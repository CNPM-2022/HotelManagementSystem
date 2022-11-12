import React from "react"
import { Link } from 'react-router-dom';
//import avt from './images/avatar1.png'


function Sidebar() {

    function handleToggle() {
        document.getElementById("sidebar").classList.toggle("active");
    }

    function handleChoosen(e) {
        //console.log(typeof e.target.parentNode.dataset.ischoosen)
        if (e.target.parentNode.dataset.ischoosen !== "1") {
            e.target.parentNode.dataset.ischoosen = "1"
            e.target.parentNode.classList.add('active')
            const list = document.querySelectorAll('.list')
            list.forEach((item) => {
                if (item !== e.target.parentNode) {
                    item.dataset.ischoosen = "0"
                    item.classList.remove('active')
                }
            })
        }
    }

    return (
        <nav id="sidebar">
            <div className="custom-menu">
                <button
                    type="button"
                    id="sidebarCollapse"
                    className="btn btn-primary"
                    onClick={handleToggle}
                ></button>
            </div>
            <div className="img img-sidebar bg-wrap text-center py-4" id='avt'>
                <div className="user-logo">
                    <div
                        className="img img-sidebar"

                    ></div>
                    <h3>John Smith</h3>
                </div>
            </div>
            <ul className="list-unstyled components mb-5">
                <li className="active list" data-ischoosen="1" onClick={handleChoosen}>
                    <Link to='/User' ><i className="bi bi-person-circle me-2"></i>Profile</Link>
                </li>
                <li className="list" data-ischoosen="0" onClick={handleChoosen}>
                    <Link to="/User/My-Booking"><i className="bi bi-bag me-2"></i>My booking</Link>
                </li>
                <li className="list" data-ischoosen="0" onClick={handleChoosen}>
                    <Link to='/User/Edit-Profile'><i className="bi bi-pencil-square me-2"></i>Edit profile</Link>
                </li>
                <li className="list" data-ischoosen="0" onClick={handleChoosen}>
                    <Link href="#"><i className="bi bi-box-arrow-right me-2"></i>Sign out</Link>
                </li>
            </ul>
        </nav >
    )
}

export default Sidebar