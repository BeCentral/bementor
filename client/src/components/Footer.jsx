import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import '../assets/css/footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__socials">
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faGithub} />
        <FontAwesomeIcon icon={faLinkedin} />
      </div>
    </footer>
  );
};

export default Footer;
