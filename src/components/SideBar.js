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
        <Link to={'/'}>
          <img src="/DataClinicLogo.png" />
        </Link>
        <p>
          <span className="data-clinic">Data Clinic</span>{' '}
          <span className="project-name">smooshr</span>
        </p>
      </div>

      <div className="content">
        <Route
          path="/project/:projectID"
          exact={true}
          component={Breadcrumbs}
        />
        <Route
          path="/project/:projectID/column/:columnID"
          exact={true}
          component={Breadcrumbs}
        />
      </div>

      <p className="social">
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faMedium} />
        <FontAwesomeIcon icon={faGithub} />
      </p>
    </div>
  );
}
