/* styles.css */
import React from "react";
import "./footer.css"; // Assuming a custom CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="https://github.com/lvdean" className="footer-btn" aria-label="Lauren Dean">
            Lauren Dean
          </a>
          <a href="https://github.com/jocelynnrd" className="footer-btn" aria-label="Jocelyn Del Castillo">
            Jocelyn Del Castillo
          </a>
          <a href="https://github.com/tmcdaniel94" className="footer-btn" aria-label="Taylor McDaniel">
            Taylor McDaniel
          </a>
          <a href="https://github.com/nramos907" className="footer-btn" aria-label="Nicholas Ramos">
            Nicholas Ramos
          </a>
          <a href="https://github.com/Br1dg3tt" className="footer-btn" aria-label="Bridgett Rice">
            Bridgett Rice
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;