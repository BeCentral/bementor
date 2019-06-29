import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ExternalLink } from '../../UI';

const Socials = ({ twitter, github }) => (
  <ul className="profile__about__socials">
    {twitter && (
      <li>
        <ExternalLink href={`https://twitter.com/${twitter}`} className="twitter">
          <i><FontAwesomeIcon icon={faTwitter} /></i>
          {twitter}
        </ExternalLink>
      </li>
    )}
    {github && (
      <li>
        <ExternalLink href={`https://github.com/${github}`} className="github">
          <i><FontAwesomeIcon icon={faGithub} /></i>
          {github}
        </ExternalLink>
      </li>
    )}
  </ul>
);

Socials.defaultProps = {
  twitter: '',
  github: ''
};

Socials.propTypes = {
  twitter: PropTypes.string,
  github: PropTypes.string
};

export default Socials;
