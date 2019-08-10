import React from 'react';
import * as PropTypes from 'prop-types';

const MiniConversation = ({ conversation, select, active }) => {
  const handleClick = () => select(conversation);

  const otherUser = conversation.with;
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`button--seamless inbox-profile ${active ? 'inbox-profile__active' : ''}`}
    >
      <div />
      <p>
        <img alt="avatar" src={`https://api.adorable.io/avatars/${otherUser._id}`} />
      </p>
      <p>
        {otherUser.firstName} {otherUser.lastName}
      </p>
    </button>
  );
};

MiniConversation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  conversation: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired
};

export default MiniConversation;
