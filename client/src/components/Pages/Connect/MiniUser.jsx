import React from 'react';
import { Link } from 'react-router-dom';

import '../../../assets/css/user.css';

const MiniUser = (props) => {
  const interests = props.interests.join(' ');
  const color = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <article className="app-user-mini">
      <Link to={`/profile/${props._id}`}><img alt="avatar" src={`https://api.adorable.io/avatars/${props._id}`} /></Link>
      <Link className="seamless" to={`/profile/${props._id}`}>
        <p>
          {props.firstName} {props.lastName}
        </p>
      </Link>
    </article>
  );
};

export default MiniUser;
