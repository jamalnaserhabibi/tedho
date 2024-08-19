import React, {useState} from "react";
import "./login.css";
import logo from "../../assets/Header.png";
import loginBG from "../../assets/loginBg.jpg";
import "../../";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ SetCurrentUser }) {
  const nav = useNavigate();
  const [error, setError] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    setError(false);
    const username = event.target.name;
    const password = event.target.value;
    setInputs((values) => ({ ...values, [username]: password }));
   
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/tedho/api/login/", inputs, {
        withCredentials: true,
      })
      .then(function (response) {
        if (response.data[0] !== "0") {
          setError(false);
          sessionStorage.setItem("userName", response.data.u_name);
          sessionStorage.setItem("userType", response.data.u_type);
          sessionStorage.setItem("uid", response.data.u_id);
          nav("/Dashboard");
        } else {
          document.getElementById("password").value = "";
          document.getElementById("username").value = "";
          setError(response.data);
        }
      });
  };

  return (
    <div
      className="login-main"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 100,0.533), rgba(33,33, 100,0.5)), url(${loginBG})`,
      }}
    >
      <div className="loginBox">
        <div className="logoBox">
          <img className="logoImage" src={logo} alt="" />
        </div>
        <div className="boxTitle">
          <h3>Finance Managment System</h3>
        </div>
        <form action="" onSubmit={handleSubmit} required className="loginInputs">
          {/* <label>Email</label> */}
          <FaUser className="icons" />
          <input type="text" onChange={handleChange} required id="username"  name="username" placeholder="Enter your username" />
          {/* <label>Password</label> */}
          <FaLock className="icons" />
          <input  onChange={handleChange}  type="password" id="password" name="password" required placeholder="Enter your password" />
          {error && <small className="errorShow"><center>Username or Passphrase is incorrect!</center></small>}
          <input   className="btnSubmit" type="submit" value="Login" />
          <label className="contactAdmin">Contact Admin For Any Issue!</label>
         
        </form>
      </div>
    </div>
  );
}