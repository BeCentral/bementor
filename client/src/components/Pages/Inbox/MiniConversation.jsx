import React, { useContext } from 'react';
import * as PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

const MiniConversation = ({ conversation, select, active }) => {
  const { user } = useContext(AuthContext);

  const handleClick = () => select(conversation);

  let otherUser = conversation.mentor;
  if (user.id === conversation.mentor) otherUser = conversation.mentee;

  let classes = 'inbox-profile';
  if (active === true) classes += ' inbox-profile__active';

  return (
    <div className={classes}>
      <button onClick={handleClick} type="button" className="button--seamless">
        <p>
          <img alt="avatar" src={`https://api.adorable.io/avatars/${otherUser._id}`} />
        </p>
        <p>{otherUser.firstName} {otherUser.lastName}</p>
      </button>
    </div>
  );
};

MiniConversation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  conversation: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired
};

export default MiniConversation;
