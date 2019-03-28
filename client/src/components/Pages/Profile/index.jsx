import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ExternalLink } from '../../UI';
import AppContainer from '../../Containers/AppContainer';
import PageContainer from '../../Containers/PageContainer';
import User from '../../../models/User';

import '../../../assets/css/profile.css';

const Profile = ({ user }) => (
  <AppContainer>
    <PageContainer className="profile">
      <button type="button" className="profile__edit">Edit your profile</button>
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
      <section>
        <h2 className="profile__about__title">About {user.firstName}</h2>
        <div className="profile__about">
          <p className="profile__about__bio">{user.bio}</p>
          <ul className="profile__about__socials">
            <li>
              <ExternalLink href={`https://twitter.com/${user.twitter}`} className="twitter">
                <i><FontAwesomeIcon icon={faTwitter} /></i>
                {user.twitter}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={`https://github.com/${user.github}`} className="github">
                <i><FontAwesomeIcon icon={faGithub} /></i>
                {user.github}
              </ExternalLink>
            </li>
          </ul>
        </div>
        <article className="profile__interests">
          <h2>Interests</h2>
          <ul>
            {user.interests.map(interest => <li key={interest}>{interest}</li>)}
          </ul>
        </article>
      </section>

    </PageContainer>
  </AppContainer>
);

Profile.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default Profile;
