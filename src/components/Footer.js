import React from 'react';
import TwoSigmaLogo from './TwoSigmaLogo';
import Social from './Social'

export default function Footer() {
  return (
    <footer>
      <TwoSigmaLogo />
      <span>
        <p className="copyright">
          © 2019 Two Sigma Investments, LP. All rights reserved. { }

          <a href='/terms' style={{color:'white'}}>Legal</a>  | { } 
          <a href='/privacy' style={{color:'white'}}>Privacy</a>

        </p>
      </span>
      <Social />
    </footer>
  );
}
