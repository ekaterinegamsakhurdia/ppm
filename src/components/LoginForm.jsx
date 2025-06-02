import React, { useState } from 'react';
import "./Kiurent_login.css";
import RegistrationForm from './RegistrationForm'
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@kiu\.edu\.ge$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Only KIU student emails are allowed';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      // put login logic or redirect here
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-page">
      <header className="site-header">
        <h1 className="site-title">KIU-rent</h1>
      </header>

      <div className="login-container">
        {/* Left: Info Section */}
        <section className="info-section">
          <h1 className="uni-logo"> KIU - rent</h1>
          <p className="platform-description">
            Welcome to KIU-rent! Connect with fellow students and rent or list items with ease.
          </p>
        </section>

        {/* Right: Form Section */}
        <section className="form-section">
          <fieldset className="form-fieldset">
            <legend className="form-legend">Login to Your Account</legend>
            <form onSubmit={handleSubmit} className="login-form">
              <label className="input-label">KIU Email:</label>
              <input
                type="email"
                name="email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}

              <label className="input-label">Password:</label>
              <input
                type="password"
                name="password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}

       <Link to="/Homepage" className="signup-link">  <button type="submit" className="login-button">Log In</button></Link>

             
            </form>
          </fieldset>
        </section>
      </div>

      <footer className="site-footer">
        <p className="signup-text">
       <Link to="/signup" className="signup-link"> Don’t have an account?</Link>
        </p>
      </footer>
    </div>
  );
};

export default LoginForm;
