import React from 'react';
import PropTypes from 'prop-types';
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
        </div>
      </div>
    </PageContainer>
  </AppContainer>
);

Profile.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default Profile;
