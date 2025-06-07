import React, { useState } from "react";
import s from "./Kiurent_login.module.css";
import RegistrationForm from "./RegistrationForm";
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
    <div className={s.loginPage}>        
    <h1 className={s.siteTitle}>KIU-rent</h1>


      <div className={s.loginContainer}>
        {/* Left: Info Section */}
        <section className={s.infoSection}>
          <h1 className={s.uniLogo}> KIU - rent</h1>
          <p className={s.platformDescription}>
            Welcome to KIU-rent! Connect with fellow students and rent or list
            items with ease.
          </p>
        </section>

        {/* Right: Form Section */}
        <section className={s.formSection}>
          <fieldset className={s.formFieldset}>
            <legend className={s.formLegend}>Login to Your Account</legend>
            <form onSubmit={handleSubmit} className={s.loginForm}>
              <label className={s.inputLabel}>KIU Email:</label>
              <input
                type="email"
                name="email"
                className={s.inputField}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className={s.errorMessage}>{errors.email}</div>
              )}

              <label className={s.inputLabel}>Password:</label>
              <input
                type="password"
                name="password"
                className={s.inputField}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className={s.errorMessage}>{errors.password}</div>
              )}

              {/* <Link to="/Homepage" className="signup-link"> */}
              {/* {" "} */}
              <button type="submit" className={s.loginButton}>
                Log In
              </button>
              {/* </Link> */}
            </form>
          </fieldset>
        </section>
      </div>

      <footer className={s.siteFooter}>
        <p className={s.signupText}>
          <Link to="/signup" className={s.signupLink}>
            {" "}
            Don’t have an account?
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default LoginForm;
