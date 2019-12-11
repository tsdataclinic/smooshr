import React from 'react';
import TwoSigmaLogo from './TwoSigmaLogo';
import Social from './Social'

export default function Footer() {
  return (
    <footer>
      <TwoSigmaLogo />
      <p className="copyright">
        © 2019 Two Sigma Investments, LP. All rights reserved.
      </p>
      <Social />
    </footer>
  );
}
