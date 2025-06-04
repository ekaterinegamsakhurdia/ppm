import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css";
import { useUser } from "../context/UserProvider";
import { use } from "react";

const Header = ({ title, subtitle }) => {
  const { logOut } = useUser();
  const navigate = useNavigate();

  const logOutUser = () => {
    logOut();
    navigate("/login");
  };

  return (
    <div className="homepage">
      <div className="navbar">
        <h1 >
        <Link className="logo" to="/" >
          KIU-rent
          </Link>
          </h1>
        <nav className="navigation">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/add-product">
            List a Product
          </Link>
          <Link className="nav-link" to="/profile">
            My Profile
          </Link>
          <button className="nav-link" onClick={logOutUser}>Log Out</button>
        </nav>
      </div>

      <div className="text">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
    </div>
  );
};

export default Header;
