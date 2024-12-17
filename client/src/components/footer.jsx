import React from "react";

const Footer = () => {
  return (
    <footer style={{ textAlign: "center", padding: "1rem" }}>
      <p>© {new Date().getFullYear()} Well Read and Beyond. All rights reserved.</p>
      <div>
        <a href="https://github.com/lvdean" aria-label="Lauren Dean">
          Lauren Dean
        </a>{" "}
        |{" "}
        <a href="https://github.com/jocelynnrd" aria-label="Jocelyn Del Castillo">
          Jocelyn Del Castillo
        </a>{" "}
        |{" "}
        <a href="https://github.com/tmcdaniel94" aria-label="Taylor McDaniel">
          Taylor McDaniel
        </a>{" "}
        |{" "}
        <a href="https://github.com/nramos907" aria-label="Nicholas Ramos">
          Nick Ramos
        </a>{" "}
        |{" "}
        <a href="https://github.com/Br1dg3tt" aria-label="Bridgett Rice">
          Bridgett Rice
        </a>
      </div>
    </footer>
  );
};

export default Footer;