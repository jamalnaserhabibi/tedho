import "./sidebar.css";
import { Link } from "react-router-dom";
import loginCheck from "../loginCheck"
import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import logo from "../../assets/Header.png";
import { useAppContext } from '../appContext';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  loginCheck();

    const { sidebarHidden, setSidebarHidden } = useAppContext();
    const handleClick = () => {
    setSidebarHidden(!sidebarHidden);
  };
  const nav = useNavigate();
  const userName = sessionStorage.getItem("userName");
  const userType = sessionStorage.getItem("userType");
  var [date, setDate] = useState(new Date());
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const signout = () => {
    sessionStorage.setItem("userName", "");
    sessionStorage.setItem("userType", "");
    sessionStorage.setItem("uid", "");
    axios
      .get("http://localhost:8080/tedho/api/Users/", {
        withCredentials: true,
      })
      .then(function (response) {
        nav("/");
      });
  };

  
  return (
    <div className="main-container">
      <div  className={sidebarHidden ? 'header headerFullSize' : 'header'}>
        <div className="logo" onClick={handleClick}>
          <img src={logo} alt="" />
        </div>
        <div className="title">
          <h3> TEDHO Finance Managment System</h3>
        </div>
        <div className="time">
          <h3> {date.toLocaleDateString()}  |  </h3>
          <h3> {date.toLocaleTimeString()}</h3>
        </div>
        <div className="logout">
          <button  onClick={signout}> Log Out </button>
        </div>
      </div>
      <div  className={sidebarHidden ? 'hideSideBarClass sidebar-main' : 'sidebar-main'}>
        <div className="profile">

        {sidebarHidden ? (
  <MdOutlineNavigateNext className="hideSideBarIcon hideSideBarIconLocationChange" onClick={handleClick} />
) : (
  <MdOutlineNavigateBefore className="hideSideBarIcon " onClick={handleClick} />
)}
          <div className="profile-image">
            ●<img src={`http://localhost:8080/tedho/api/Users/image/${userName}?${new Date().getTime()}`} alt="" />●
          </div>

          <div className="profile-info">
            <h4>{userName}</h4>
            <h5>{userType}</h5>
          </div>
        </div>
        <div className="menu-list">
          <ul>
            <Link to="/Dashboard">
              <span>
                <MdDashboard /> <li> Dashboard</li>
              </span>
            </Link>
            <Link to="/Purchase">
              {" "}
              <span>
                <BiSolidPurchaseTagAlt /> <li>Expense</li>
              </span>
            </Link>
            <Link to="/Expense">
              <span>
                <GiTakeMyMoney /> <li>Add Expense</li>
              </span>
            </Link>
            <Link to="/Budget">
              {" "}
              <span>
                <FaMoneyCheckDollar /> <li>Budget</li>
              </span>
            </Link>
            <span>
              <MdDashboard /> <li>Something</li>
            </span>
            <span>
              <MdDashboard /> <li>Something</li>
            </span>
            <Link to="/Users">
              {" "}
              <span>
                <BiSolidUserAccount /> <li>User Account</li>
              </span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
