import React from 'react';
import {
  faTwitter,
  faMedium,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import TwoSigmaLogo from './TwoSigmaLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer>
      <TwoSigmaLogo />
      <p className="copyright">
        © 2019 Two Sigma Investments, LP. All rights reserved.
      </p>
      <p className="social">
        <a href="https://twitter.com/tsdataclinic?lang=en" target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://medium.com/dataclinic" target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faMedium} />
        </a>
        <a href="https://github.com/tsdataclinic" target="blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </p>
    </footer>
  );
}
