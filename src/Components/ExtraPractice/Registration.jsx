import React, { useState } from "react";
import "./Registration.css";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters long"),

  mname: Yup.string()
    .required("Middle name is required")
    .min(2, "Middle Name must be at least 2 characters long"),

  lname: Yup.string()
    .required("Last name is required")
    .min(2, "Last Name must be at least 2 characters long"),

  bdate: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  number: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["male", "female"], "Invalid gender selection"),

  course: Yup.string()
    .required("Course selection is required")
    .oneOf(["MSc-IT", "BSc-IT", "BCA"], "Please select a valid course "),

  address: Yup.string().required("Address is required"),

  file: Yup.mixed().required("Photo is required"),
  // .test(
  //   "fileSize",
  //   "File size is too large, must be less than 2MB",
  //   (value) => value && value.size <= 2 * 1024 * 1024
  // ),
});

export const Registration = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  // reset data
  const initialState = {
    fname: "",
    mname: "",
    lname: "",
    bdate: "",
    email: "",
    number: "",
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
  async function handleData(e) {
    e.preventDefault();
    console.log(input);

    try {
      await validationSchema.validate(input, { abortEarly: false });
      setErrors({});
      localStorage.setItem("stud-register", JSON.stringify(input));
      navigate("/");
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });

      setErrors(validationErrors);
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
          </div>

          <div className="error-container">
            {errors.fname && (
              <span style={{ color: "red", fontSize: 12 }}>{errors.fname}</span>
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
          </div>
          <div className="error-container">
            {errors.mname && (
              <span style={{ color: "red", fontSize: 12 }}>{errors.mname}</span>
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
          </div>
          <div className="error-container">
            {errors.lname && (
              <span style={{ color: "red", fontSize: 12 }}>{errors.lname}</span>
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
          </div>
          <div className="error-container">
            {errors.bdate && (
              <span style={{ color: "red", fontSize: 12 }}>{errors.bdate}</span>
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
          </div>
          <div className="error-container">
            {errors.email && (
              <span style={{ color: "red", fontSize: 12 }}>{errors.email}</span>
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
          </div>
          <div className="error-container">
            {errors.number && (
              <span style={{ color: "red", fontSize: 12 }}>
                {errors.number}
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
          </div>
          <div className="error-container">
            {errors.gender && (
              <span style={{ color: "red", fontSize: 12 }}>
                {errors.gender}
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
              <option value="MSc-IT">MSc IT</option>
              <option value="BSc-IT">BSc IT</option>
              <option value="BCA">BCA</option>
            </select>
          </div>
          <div className="error-container">
            {errors.course && (
              <span style={{ color: "red", fontSize: 12 }}>
                {errors.course}
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
          </div>
          <div className="error-container">
            {errors.address && (
              <span style={{ color: "red", fontSize: 12 }}>
                {errors.address}
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
          </div>
          <div className="error-container">
            {errors.file && (
              <span style={{ color: "red", fontSize: 12 }}>{errors.file}</span>
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
