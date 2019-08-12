import React from 'react';
import * as PropTypes from 'prop-types';
import { Avatar } from 'evergreen-ui';

const MiniConversation = ({ conversation, select, active }) => {
  const handleClick = () => select(conversation);

  const partner = conversation.with;
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`button--seamless inbox__profile ${active ? 'inbox__profile__active' : ''}`}
    >
      <div className="inbox__profile__avatar ">
        <Avatar src={partner.picture} size={50} name={`${partner.firstName} ${partner.lastName}`} />
      </div>
      <p>
        {partner.firstName} {partner.lastName}
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
