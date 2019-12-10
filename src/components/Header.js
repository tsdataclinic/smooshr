import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ history, match }) {
  return (
    <div className="sidenav">
      <div className="logos">
        <Link style={{ display: 'flex', alignItems: 'center' }} to={'/'}>
          <img alt={"Data Clinic Modal"} src={`${process.env.PUBLIC_URL}/DataClinicLogo.png`} />{' '}
          <span className="data-clinic">Data Clinic</span>{' '}
        </Link>
        <span className="project-name">smooshr (beta)</span>
      </div>
      <div className="spacer" />
      <div className="top-menu">
        <Link to="/">Projects</Link>
        <Link to="/about">About</Link>
        <a target="_blank" rel="noopener noreferrer" href="https://airtable.com/shrMCZrvP7467LNG7">
          Feedback
        </a>
      </div>
    </div>
  );
}
