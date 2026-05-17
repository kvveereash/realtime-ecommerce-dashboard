import React from 'react'
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <h2>Subscribe to our newsletter</h2>

        <label>Email address</label>

        <input
          type="email"
          placeholder="Your email address"
          className="footer-input"
        />

        <button className="footer-btn">Subscribe</button>

        <div className="footer-icons">
          <i className="fab fa-instagram"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-pinterest"></i>
        </div>

      </div>
    </footer>
  );
}

export default Footer;