import React from "react";
import "./Homepage.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { useEffect } from "react";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="welcome-text">
        <h2>Make Campus Sharing Easy!</h2>
        <h3>
          Rent from fellow students and staff — or earn by listing what you’re
          not using!
        </h3>
      </div>

      <fieldset className="browse-section">
        <legend className="browse-title">Browse by Product Type</legend>
        <div className="product-grid">

          <Link to="/products/transportation" className="product-card">

              <h3 className="product-title">Transportation</h3>
              <img src="./public/bike.jpg" width="270" />
          </Link>

          <Link to="/products/appliances" className="product-card">
              <h3 className="product-title">Home Appliances</h3>
              <img src="./public/airfryer1.jpg" width="300" />
          </Link>

          <Link to="/products/other" className="product-card">
              <h3 className="product-title">Other Goods</h3>
              <img src="./public/other.jpg" width="300" />
          </Link>
        </div>
      </fieldset>

      <div className="list-cta">
        <h4>
          Got something lying around?{" "}
          <a className="list-cta-link" href="/add-product">
            List it now!
          </a>
        </h4>
      </div>

      <div className="footer">

        
        <div className="footer-navigation">
          <h3>navigation</h3>
          <Link className="fnav-link" to="/">
                      Home
          </Link>
          <Link className="fnav-link" to="/add-product">
                      List a Product
          </Link>
          <Link className="fnav-link" to="/profile">
                      My Profile
          </Link>
        </div>

        <div className="help">
          <h3>help</h3>
          <div className="fnav-link-email">
            <a className="fnav-link" href="mailto:infokiurent@gmail.com">
              <div className="icon">
                <img
                  className="mailicon"
                  src="./public/mail.png"
                  width="20"
                  height="20"
                />
                <p className="mailinfo">infokiurent@gmail.com</p>
              </div>
            </a>
          </div>

          <div className="fnav-link-tel">
            <a className="fnav-link" href="tel:+995555555555">
              <div className="icon">
                <img
                  className="telicon"
                  src="./public/phone-call.png"
                  width="20"
                  height="20"
                />
                <p className="telinfo">+995555555555</p>
              </div>
            </a>
          </div>
        </div>

        <div className="categories">
          <h3>categories</h3>
           <Link to="/products/transportation" className="fnav-link">
          transportation
          </Link>
          <Link to="/products/transportation" className="fnav-link">
          home appliances
          </Link>
          <Link to="/products/transportation" className="fnav-link">
          other
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
