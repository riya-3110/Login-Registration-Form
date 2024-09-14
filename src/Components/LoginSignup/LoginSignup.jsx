import React, { useState } from "react";
import "./LoginSignup.css";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";

export const LoginSignup = () => {
  const [action, setAction] = useState("Login");

  return (
    <div className="wrapper">
      <div className="heading">
        <h1>{action}</h1>
        <div className="underline"></div>
      </div>
      {action === "Login" ? (
        <div />
      ) : (
        <div className="input-box">
          <FaUser className="icon" />
          <input type="text" placeholder="Name" />
        </div>
      )}
      <div className="input-box">
        <MdEmail className="icon" />
        <input type="email" placeholder="Email Id" />
      </div>
      <div className="input-box">
        <FaKey className="icon" />
        <input type="password" placeholder="Password" />
      </div>
      {action === "Sign Up" ? (
        <div />
      ) : (
        <div className="forgot-password">
          <p>
            Forgot password? <a href="#">Click here</a>
          </p>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
};
