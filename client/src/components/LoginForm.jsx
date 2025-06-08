import React, { useState } from "react";
import "./Kiurent_login.css";
// import RegistrationForm from "./RegistrationForm";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import axios from "axios";
import { useEffect } from "react";

const LoginForm = () => {
  const { id, setId } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (id) {
      logIn(id);
    }
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const logIn = (email) => {
    setId(email);
    navigate("/");
  };
  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@kiu\.edu\.ge$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Only KIU student emails are allowed";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      // put login logic or redirect here
      axios
        .post("http://localhost:3000/login", { ...formData })
        .then((data) => {
          logIn(data.data.email);
        })
        .catch((err) => console.log(err));
    } else {
      setErrors(validationErrors);
    }
  };

return (
  <div className="loginPage">        
    <h1 className="site-title">KIU-rent</h1>
    <div className="loginContainer">
      <section className="infoSection">
        <h1 className="uniLogo"> KIU - rent</h1>
        <p className="platformDescription">
          Welcome to KIU-rent! Connect with fellow students and rent or list
          items with ease.
        </p>
      </section>

      {/* Right: Form Section */}
      <section className="formSection">
        <fieldset className="formFieldset">
          <legend className="formLegend">Login to Your Account</legend>
          <form onSubmit={handleSubmit} className="loginForm">
            <label className="inputLabel">KIU Email:</label>
            <input
              type="email"
              name="email"
              className="inputField"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="errorMessage">{errors.email}</div>
            )}

            <label className="inputLabel">Password:</label>
            <input
              type="password"
              name="password"
              className="inputField"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="errorMessage">{errors.password}</div>
            )}

            <button type="submit" className="loginButton">
              Log In
            </button>
          </form>
        </fieldset>
      </section>
      
    </div>

    
      <p className="signupText">
        <Link to="/signup" className="signupLink">
          Don’t have an account?
        </Link>
      </p>
  </div>
);
}

export default LoginForm;
