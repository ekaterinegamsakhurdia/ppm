import { useState } from "react";
import "./Kiurent_registration.css";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const { setId } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    status: [],
  });

  const [errors, setErrors] = useState({});

  const emailPattern = /^[a-zA-Z0-9._%+-]+@kiu\.edu\.ge$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "status") {
      setFormData((prev) => {
        const updatedStatus = checked
          ? [...prev.status, value]
          : prev.status.filter((status) => status !== value);
        return { ...prev, status: updatedStatus };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Only KIU student emails are allowed.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (formData.status.length === 0) {
      newErrors.status = "Please select at least one status.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // 👇 this is where you’d send the data (API call, etc.)
      // console.log("Form submitted ✅", formData);
      // alert("Registered successfully 🎉 (fake, but we believe in dreams!)");

      axios
        .post("http://localhost:3000/register", { ...formData })
        .then((data) => {
          axios
            .post("http://localhost:3000/login", { ...formData })
            .then((data) => {
              setId(data.data.email);
              navigate("/");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <div className="form-box">
          <div className="form-title">Sign up here</div>

          <label className="form-label">First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-input"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && (
            <div className="error-message">{errors.first_name}</div>
          )}

          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-input"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <div className="error-message">{errors.last_name}</div>
          )}

          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}

          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}

          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}

          <div className="status-box">
            <label className="form-label">Status</label>
            <div className="checkbox-group">
              {[
                "Student",
                "Staff",
                "Student Assistant",
                "Teaching Assistant",
              ].map((role) => (
                <label key={role}>
                  <input
                    type="checkbox"
                    name="status"
                    value={role}
                    checked={formData.status.includes(role)}
                    onChange={handleChange}
                  />{" "}
                  {role
                    .replace("_", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </label>
              ))}
            </div>
            {errors.status && (
              <div className="error-message">{errors.status}</div>
            )}
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <Link className="nav-link" to="/login">
            Login page
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
