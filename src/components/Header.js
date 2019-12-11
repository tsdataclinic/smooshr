import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav'

export default function Header({ history, match }) {
  return (
    <div className="header">
      <div className="logos">
        <Link style={{ display: 'flex', alignItems: 'center' }} to={'/'}>
          <img alt={"Data Clinic Modal"} src={`${process.env.PUBLIC_URL}/DataClinicLogo.png`} />{' '}
          <span className="c">Data Clinic</span>{' '}
        </Link>
        <span className="project-name">smooshr (beta)</span>
      </div>
      <div className="spacer" />
      <Nav />

    </div>
  );
}
