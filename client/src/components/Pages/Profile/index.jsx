import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import AppContainer from '../../Containers/AppContainer';
import PageContainer from '../../Containers/PageContainer';
import User from '../../../models/User';

import '../../../assets/css/profile.css';

const Profile = ({ user }) => (
  <AppContainer>
    <PageContainer className="profile">
      <div className="profile__subject">
        <div className="profile__subject__avatar-wrapper">
          <img src={user.picture} alt={`Avatar of ${user.firstName}`} />
        </div>
        <div className="profile__subject__title">
          <h2>{user.firstName} {user.lastName}</h2>
          <h3>{user.tagline}</h3>
          <h4><FontAwesomeIcon icon={faMapMarkerAlt} /> {user.location}</h4>
        </div>
      </div>
      <div className="profile__about">
        <article className="profile__bio">
          <h2>About {user.firstName}</h2>
          <p>{user.bio}</p>
        </article>
        <ul className="profile__socials">
          <li>
            <a href={`https://twitter.com/${user.twitter}`}>
              <FontAwesomeIcon icon={faTwitter} />{user.twitter}
            </a>
          </li>
          <li>
            <a href={`https://twitter.com/${user.github}`}>
              <FontAwesomeIcon icon={faGithub} />{user.github}
            </a>
          </li>
        </ul>
      </div>

    </PageContainer>
  </AppContainer>
);

Profile.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default Profile;
