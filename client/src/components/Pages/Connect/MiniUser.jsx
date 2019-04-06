import React from 'react';

import '../../../assets/css/user.css';

const MiniUser = (props) => {
  const interests = props.interests.join(' ');
  const color = Math.floor(Math.random() * 16777215).toString(16);

  const handleClick = (event) => {
    event.preventDefault();
    props.connect(props._id);
  };

  return (
    <section className="app-user_mini">
      <img alt="avatar" src={`https://api.adorable.io/avatars/${props._id}`}/>
      <p>
        {props.firstName} {props.lastName}
      </p>
      {props.tagLine && <p style={{backgroundColor: `'#${color}`, color: 'white'}}>
        {props.tagLine}
      </p>}
      {interests && <p>
        {interests}
      </p>}
      <a href="#" onClick={handleClick}>Connect</a>
    </section>
  );
};

export default MiniUser;
