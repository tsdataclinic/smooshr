import React from 'react';
import {Link} from 'react-router-dom';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function SideBar({history}) {

  const goBack = ()=>{
     history.goBack()
  }
  return (
    <div className="sidenav">
      <Link to={'/'}>
        <img src="/DataClinicLogo.png" style={{maxWidth: '65%'}} />
      </Link>
      <p>Smooshr</p>
      <span class="spacer" />
      <FontAwesomeIcon icon={faChevronLeft} onClick={goBack} />
    </div>
  );
}
