import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import okbeLogo from '../../assets/images/logo/open-knowledge-belgium.svg';
import becentralLogo from '../../assets/images/logo/becentral.png';

import '../../assets/css/footer.css';

const Footer = () => (
  <footer className="app-footer">
    <div className="app-footer__socials">
      <i><FontAwesomeIcon icon={faTwitter} /></i>
      <i><FontAwesomeIcon icon={faGithub} /></i>
      <i><FontAwesomeIcon icon={faLinkedin} /></i>
    </div>
    <div className="app-footer__logos">
      <a href="https://openknowledge.be" target="_blank" rel="noopener noreferrer">
        <img src={okbeLogo} alt="Open Knowledge Belgium logo" />
      </a>
      <a href="https://becentral.org" target="_blank" rel="noopener noreferrer">
        <img src={becentralLogo} alt="BeCentral logo" />
      </a>
    </div>
  </footer>
);

export default Footer;
