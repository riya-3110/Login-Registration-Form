import React, { useState } from "react";
import "./Apply.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const Apply = () => {
  const navigate = useNavigate();

  const [otpEnabled, setOtpEnabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    email: "",
    number: "",
    course: "",
  });
  const [errorsForOtp, setErrorsForOtp] = useState({});
  const [otpData, setOtpData] = useState({
    otp: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    number: Yup.string()
      .required("Contact no is required")
      .matches(/^[0-9]{10}$/, "Contact no must be exactly 10 digits"),
    course: Yup.string()
      .required("Course is required")
      .oneOf(["MSc-IT", "BSc-IT", "BCA"], "Please select a valid course"),
  });

  const validationSchemaForOtp = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^[0-9]{6}$/, "OTP must be exactly 6 digits"),
  });

  function handleInputs(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleDone() {
    try {
      await validationSchema.validate(input, { abortEarly: false });
      setErrors({});
      localStorage.setItem("stud-login", JSON.stringify(input));
      console.log(input);

      const availableData = JSON.parse(localStorage.getItem("stud-register"));
      console.log("availableData email :", availableData.email);
      console.log("availableData course:", availableData.course);
      console.log("available Contact no:", availableData.number);

      if (
        availableData.email.trim().toLowerCase() ==
          input.email.trim().toLowerCase() &&
        availableData.course == input.course &&
        availableData.number == input.number
      ) {
        console.log("OTP Enabled");
        setOtpEnabled(true); // Enable OTP field
      } else {
        console.log("Data mismatch, OTP not enabled");
      }
    } catch (error) {
      if (error.inner && error.inner.length > 0) {
        const validationErrors = {};
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.log("Validation error", error);
      }
    }
  }

  async function handleData(e) {
    e.preventDefault();
    console.log("otpData before validation:", otpData);

    try {
      await validationSchemaForOtp.validate(otpData, { abortEarly: false });
      setErrorsForOtp({});
      navigate("/home");
    } catch (error) {
      const validationErrors = {};

      // If error has `inner` (multiple errors), handle it
      if (error.inner && error.inner.length > 0) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      } else if (error.path) {
        // Handle single error scenario
        validationErrors[error.path] = error.message;
      } else {
        console.log("Unexpected validation error:", error);
      }
      console.log("validationErrors::", validationErrors);
      setErrorsForOtp(validationErrors);
    }
  }

  return (
    <div>
      <div className="heading1">
        <h1>WELCOME</h1>
      </div>
      <div className="main-container">
        <div className="img-container"></div>

        <form className="info-container">
          <h2>Sign In</h2>
          <div className="input-container">
            <label>Enter Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleInputs}
              autoComplete="off"
              required
            />
          </div>
          <div className="error-container">
            {errors.email && (
              <span style={{ color: "yellow", fontSize: 12 }}>
                {errors.email}
              </span>
            )}
          </div>

          <div className="input-container">
            <label>Enter Contact Number</label>
            <input
              type="tel"
              name="number"
              value={input.number}
              onChange={handleInputs}
              autoComplete="off"
              required
            />
          </div>
          <div className="error-container">
            {errors.number && (
              <span style={{ color: "yellow", fontSize: 12 }}>
                {errors.number}
              </span>
            )}
          </div>

          <div className="input-container">
            <label>Select Course</label>
            <select
              name="course"
              value={input.course}
              onChange={handleInputs}
              required
            >
              <option value="">Select option</option>
              <option value="MSc-IT">MSc IT</option>
              <option value="BSc-IT">BSc IT</option>
              <option value="BCA">BCA</option>
            </select>
          </div>
          <div className="error-container">
            {errors.course && (
              <span style={{ color: "yellow", fontSize: 12 }}>
                {errors.course}
              </span>
            )}
          </div>

          <button type="button" className="btn1" onClick={handleDone}>
            Done
          </button>

          <div className="input-container">
            <label>Enter OTP</label>
            <input
              type="tel"
              name="otp"
              value={otpData.otp}
              onChange={(e) => {
                setOtpData({ otp: e.target.value });
              }}
              disabled={!otpEnabled}
            />
          </div>
          <div className="error-container">
            {errorsForOtp.otp && (
              <span style={{ color: "yellow", fontSize: 12 }}>
                {errorsForOtp.otp}
              </span>
            )}
          </div>

          <button
            type="buttonn"
            onClick={handleData}
            className="btn2"
            disabled={!otpEnabled}
          >
            Submit
          </button>
          <p>
            Click here to<Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
