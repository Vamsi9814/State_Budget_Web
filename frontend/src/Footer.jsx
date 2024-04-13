import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        {/*<img className="logo" src={logo} alt="" />*/}
        <h4>Contact</h4>
        <p>
          <strong>Address: </strong>123 Madhapur Road, Street 10, Hyderabad
        </p>
        <p>
          <strong>Phone: </strong>(+91) 0123456789
        </p>
        <p>
          <strong>Hours: </strong>10:00 - 18:00, Mon - Sat
        </p>
      </div>

      <div className="col2">
        <h4>About</h4>
        <Link to="/contact">About us</Link>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
      </div>

      <div className="copyright">
        <p>2024, Transparency Connect</p>
      </div>
    </footer>
  );
};

export default Footer;
