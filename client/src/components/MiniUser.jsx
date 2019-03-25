import React from 'react';

import '../assets/css/user.css';

const MiniUser = (props) => {
  const interests = props.interests.join(' ');
  const color = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <section className="app-user_mini">
      <img alt="avatar" src={`https://api.adorable.io/avatars/${props._id}`} />
      <p>
        {props.firstName} {props.lastName}
      </p>
      <p style={{ backgroundColor: `'#${color}`, color: 'white' }}>
        {props.about}
      </p>
      <p>
        {interests}
      </p>
    </section>
  );
};

export default MiniUser;
