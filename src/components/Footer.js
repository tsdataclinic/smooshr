import React from 'react';
import {
  faTwitter,
  faMedium,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import TwoSigmaLogo from './TwoSigmaLogo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer>
      <TwoSigmaLogo />
      <p className="copyright">
        © 2019 Two Sigma Investments, LP. All rights reserved.
      </p>
      <p className="social">
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faMedium} />
        <FontAwesomeIcon icon={faGithub} />
      </p>
    </footer>
  );
}
