import React from 'react';
import PropTypes from 'prop-types';
import okbeLogo from '../assets/images/logo/open-knowledge-belgium.svg';
import becentralLogo from '../assets/images/logo/becentral.png';
import { ExternalLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import '../assets/css/footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__socials">
        <i><FontAwesomeIcon icon={faTwitter} /></i>
        <i><FontAwesomeIcon icon={faGithub} /></i>
        <i><FontAwesomeIcon icon={faLinkedin} /></i>
      </div>
      <div className="app-footer__logos">
        <a href="https://openknowledge.be" target="_blank"><img src={okbeLogo} alt="Open Knowledge Belgium logo" /></a>
        <a href="https://becentral.org" target="_blank"><img src={becentralLogo} alt="BeCentral logo" /></a>
      </div>
    </footer>
  );
};

export default Footer;
