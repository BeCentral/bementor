import React, { useState, useContext } from 'react';
import * as PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { Link } from 'react-router-dom';
import PageContainer from '../../Containers/PageContainer';
import ConversationOverview from './ConversationOverview';
import { API } from '../../../constants';
import AuthContext from '../../../context/auth-context';

const MiniConversation = ({ conversation, select, active }) => {
  const { user } = useContext(AuthContext);

  const handleClick = () => select(conversation);

  let otherUser = conversation.mentor;
  if (user.id === conversation.mentor) {
    otherUser = conversation.mentee;
  }

  let classes = 'inbox-profile';
  if (active === true) {
    classes += ' inbox-profile__active';
  }

  return (
    <div onClick={handleClick} className={classes}>
      <p>
        <img alt="avatar" src={`https://api.adorable.io/avatars/${otherUser._id}`} />
      </p>
      <p>{otherUser.firstName} {otherUser.lastName}</p>
    </div>
  );
};

MiniConversation.propTypes = {
  conversation: PropTypes.object
};

export default MiniConversation;
