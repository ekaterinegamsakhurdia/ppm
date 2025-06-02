import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const Header = ({ title, subtitle }) => (
  <div className="homepage">
    <div className="navbar">
      <h1 className="logo">KIU-rent</h1>
      <nav className="navigation">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/find">Find a Product</Link>
        <Link className="nav-link" to="/list">List a Product</Link>
        <Link className="nav-link" to="/profile">My Profile</Link>
        <Link className="nav-link" to="/login">Log Out</Link>
      </nav>
    </div>

    <div className="text">
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
    </div>
  </div>
);

export default Header;
