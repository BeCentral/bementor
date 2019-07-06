import React from 'react';
import PropTypes from 'prop-types';
import { Badge, IconButton, Tooltip } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import User from '../../../models/User';

import '../../../assets/css/user.css';

const UserCard = ({ user }) => {
  const renderInterests = () => {
    if (!user.interests || user.interests.length === 0) return null;
    const $interests = user.interests.map(i => <li key={i.name}><Badge>{i.name}</Badge></li>);
    return <ul className="user-card__interests">{$interests}</ul>;
  };

  const $interests = renderInterests();
  return (
    <article className="user-card">
      <Link to={`/profile/${user._id}`}>
        <img alt="User vatar" src={user.picture || `https://api.adorable.io/avatars/${user._id}`} />
      </Link>
      <Link className="user-card__link seamless" to={`/profile/${user._id}`}>
        <p>
          {user.firstName} {user.lastName}
        </p>
        <Tooltip content={`Connect with ${user.firstName}`}>
          <IconButton className="user-card__connect" appearance="minimal" height={32} icon="chat" />
        </Tooltip>
      </Link>
      {$interests}
    </article>
  );
};

UserCard.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default UserCard;
