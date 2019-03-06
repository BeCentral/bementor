import React from 'react';
import PropTypes from 'prop-types';
import okbeLogo from '../assets/images/logo/open-knowledge-belgium.svg';
import becentralLogo from '../assets/images/logo/becentral.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import '../assets/css/footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__socials">
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faGithub} />
        <FontAwesomeIcon icon={faLinkedin} />
      </div>
      <div className="app-footer__logos">
        <img src={okbeLogo} alt="Open Knowledge Belgium logo" />
        <img src={becentralLogo} alt="BeCentral logo" />
      </div>
    </footer>
  );
};

export default Footer;
