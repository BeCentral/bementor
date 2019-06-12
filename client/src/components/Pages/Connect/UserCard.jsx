import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import User from '../../../models/User';

import '../../../assets/css/user.css';

const UserCard = ({ user }) => (
  <article className="app-user-mini">
    <Link to={`/profile/${user._id}`}>
      <img alt="avatar" src={user.picture || `https://api.adorable.io/avatars/${user._id}`} />
    </Link>
    <Link className="seamless" to={`/profile/${user._id}`}>
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>
        {user.bio}
      </p>
    </Link>
  </article>
);

UserCard.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default UserCard;
