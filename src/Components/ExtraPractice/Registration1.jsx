import React, { useState } from "react";
import "./Registration.css";
import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";

export const Registration = () => {
  const navigate = useNavigate();

  const [error, setError] = useState({});

  // reset data
  const initialValue = {
    fname: "",
    mname: "",
    lname: "",
    bdate: "",
    email: "",
    gender: "",
    course: "",
    address: "",
    file: "",
  };
  const [input, setInput] = useState(initialState);

  // get the value of the current input
  function handleInputs(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  //   const [fname, setFname] = useState("");
  //   const [mname, setMname] = useState("");

  //   function handleFname(e) {
  //     setFname(e.target.value);
  //   }
  //   localStorage.setItem("Register", JSON.stringify({fname,mname,lname}));

  // store data in local storage
  function handleData(e) {
    e.preventDefault();
    console.log(input);
    localStorage.setItem("stud-register", JSON.stringify(input));

    const validationError = {};
    if (!(input.fname || "").trim()) {
      validationError.fname = "First name required";
    }
    if (!(input.mname || "").trim()) {
      validationError.mname = "Middle name is required";
    }
    if (!(input.lname || "").trim()) {
      validationError.lname = "Last name is required";
    }
    if (!(input.bdate || "").trim()) {
      validationError.bdate = "Birth date is required";
    }

    if (!(input.email || "").trim()) {
      validationError.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      validationError.email = "Invalid email address";
    }

    if (!(input.number || "").trim()) {
      validationError.number = "Contact number is required";
    } else if (!/^\d{10}$/.test(input.number)) {
      validationError.number = "Contact number is must in 10 character";
    }
    if (!(input.gender || "").trim()) {
      validationError.gender = "Gender is required";
    }
    if (!(input.course || "").trim()) {
      validationError.course = "Course is required";
    }
    if (!(input.address || "").trim()) {
      validationError.address = "Address is required";
    }
    if (!input.file) {
      validationError.file = "Photo is required";
    }

    setError(validationError);
    if (Object.keys(validationError).length == 0) {
      navigate("/");
    }
  }

  // to clear all field of the form
  function resetForm() {
    setInput(initialState);
  }

  //   file uploading
  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  return (
    <>
      <form className="form-container" onSubmit={handleData}>
        <h1 className="heading">Registration</h1>
        <div className="container">
          <div className="input-data">
            <label>First Name</label>
            <input
              type="text"
              name="fname"
              value={input.fname}
              onChange={handleInputs}
              className="text-input"
              autoComplete="off"
            />
            {error.fname && (
              <span style={{ color: "blue", fontSize: 12 }}>{error.fname}</span>
            )}
          </div>
          <div className="input-data">
            <label>Middle Name</label>
            <input
              type="text"
              name="mname"
              value={input.mname}
              onChange={handleInputs}
              className="text-input"
              autoComplete="off"
            />
            {error.mname && (
              <span style={{ color: "blue", fontSize: 12 }}>{error.mname}</span>
            )}
          </div>
          <div className="input-data">
            <label>Last Name</label>
            <input
              type="text"
              name="lname"
              value={input.lname}
              onChange={handleInputs}
              className="text-input"
              autoComplete="off"
            />
            {error.lname && (
              <span style={{ color: "blue", fontSize: 12 }}>{error.lname}</span>
            )}
          </div>

          <div className="input-data">
            <label>Date of Birth</label>
            <input
              type="date"
              name="bdate"
              value={input.bdate}
              onChange={handleInputs}
              className="dob-input"
            />
            {error.bdate && (
              <span style={{ color: "blue", fontSize: 12 }}>{error.bdate}</span>
            )}
          </div>

          <div className="input-data">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleInputs}
              className="email-input"
              autoComplete="off"
            />
            {error.email && (
              <span style={{ color: "blue", fontSize: 12 }}>{error.email}</span>
            )}
          </div>

          <div className="input-data">
            <label>Contact Number</label>
            <input
              type="tel"
              name="number"
              value={input.number}
              onChange={handleInputs}
              className="email-input"
              autoComplete="off"
            />
            {error.number && (
              <span style={{ color: "blue", fontSize: 12 }}>
                {error.number}
              </span>
            )}
          </div>

          <div className="input-data">
            <label>Gender</label>

            <div className="radio-data">
              <div className="radio1">
                <input
                  type="radio"
                  name="gender" // Same name for both radio buttons
                  value="male"
                  checked={input.gender === "male"} // Control checked state
                  onChange={handleInputs} // Handle change event
                  className="radio-male"
                />
                <span>Male</span>
              </div>
              <div className="radio2">
                <input
                  type="radio"
                  name="gender" // Same name for both radio buttons
                  value="female"
                  checked={input.gender === "female"} // Control checked state
                  onChange={handleInputs} // Handle change event
                  className="radio-female"
                />
                <span>Female</span>
              </div>
            </div>
            {error.gender && (
              <span style={{ color: "blue", fontSize: 12 }}>
                {error.gender}
              </span>
            )}
          </div>

          <div className="input-data">
            <label>Choose Course</label>
            <select
              name="course"
              value={input.course}
              onChange={handleInputs}
              className="course-input"
            >
              <option value="">Select Course</option>
              <option value="MScIT">MSc IT</option>
              <option value="BSc IT">BSc IT</option>
              <option value="BCA">BCA</option>
            </select>
            {error.course && (
              <span style={{ color: "blue", fontSize: 12 }}>
                {error.course}
              </span>
            )}
          </div>

          <div className="input-data">
            <label>Address</label>
            <textarea
              name="address"
              value={input.address}
              onChange={handleInputs}
              className="address-input"
              autoComplete="off"
            />
            {error.address && (
              <span style={{ color: "blue", fontSize: 12 }}>
                {error.address}
              </span>
            )}
          </div>

          <div className="input-data upload-file">
            <label>Photo</label>
            <input
              id="file-input"
              type="file"
              name="file"
              value={input.file}
              onChange={handleInputs}
              className="file-container"
              style={{ display: "none" }}
            />

            {/* custom file button with css  */}
            <button
              type="button"
              className="custom-file-button"
              onClick={triggerFileInput}
            >
              Choose File
            </button>
            <br />
            {/* Display file name */}
            <span className="file-name">{input.file || "No file chosen"}</span>
            {error.file && (
              <span style={{ color: "blue", fontSize: 12 }}>{error.file}</span>
            )}
          </div>
        </div>
        <div className="btn-container">
          <button type="submit">Submit</button>
          <button type="button" onClick={resetForm}>
            Reset
          </button>
        </div>
        <p>
          Click here to<Link to="/">Login</Link>
        </p>
      </form>
    </>
  );
};
