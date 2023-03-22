import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

export default function Header({ history, match }) {
  return (
    <div>
      <div className="header">
        <div className="logos">
          <Link style={{ display: "flex", alignItems: "center" }} to={"/"}>
            <img
              alt={"Data Clinic Modal"}
              src={`${process.env.PUBLIC_URL}/DataClinicLogo.png`}
            />{" "}
            <span className="data-clinic">Data Clinic</span>{" "}
          </Link>
          <span className="project-name">smooshr (beta)</span>
        </div>
        <div className="spacer" />
        <Nav />
      </div>
      <div
        style={{
          backgroundColor: "#ef4444",
          color: "white",
          padding: 12,
          fontSize: "1.33rem",
        }}
      >
        This app is currently under development and some features may not be
        stable.
      </div>
    </div>
  );
}
