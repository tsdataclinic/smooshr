import React from 'react';
import {Link, Route} from 'react-router-dom';
import {useProject, useColumn} from '../contexts/app_context';
import Breadcrumbs from './Breadcrumbs';
import {
  faTwitter,
  faMedium,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function SideBar({history, match}) {
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="sidenav">
      <div className="logos">
        <Link style={{display: 'flex', alignItems: 'center'}} to={'/'}>
          <img src="/DataClinicLogo.png" />
          <span className="data-clinic">Data Clinic</span>{' '}
        </Link>
        <span className="project-name">smooshr (beta)</span>
      </div>
      <div className="spacer" />
      <div className="top-menu">
        <Link to="/">Projects</Link>
        <Link to="/about">About</Link>
        <a target="_blank" href="https://airtable.com/shrMCZrvP7467LNG7">
          Feedback
        </a>
      </div>
    </div>
  );
}
