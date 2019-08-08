import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth-context';

import '../../../assets/css/inbox.css';

const Conversation = ({ onMessage, conversation }) => {
  const { user } = useContext(AuthContext);
  const $replyBar = useRef(null);

  const onClick = () => {
    onMessage($replyBar.current.value);
    $replyBar.current.value = '';
  };

  if (!conversation === false) {
    return (
      <div className="inbox-conversation inbox-conversation__empty">
        <h3>Find a mentor and start chatting</h3>
        <Button appearance="primary" intent="success">
          <Link className="seamless" to="/connect">
            Connect
          </Link>
        </Button>
      </div>
    );
  }

  if (!conversation) return <div className="inbox-conversation" />;

  let otherUser = conversation.mentor;
  if (user.id === conversation.mentor) otherUser = conversation.mentee;

  if (!conversation.messages) return <p />;
  const $messages = conversation.messages.map(message => (
    <div key={message._id} className="inbox-message inbox-message">
      <p>{message.text}</p>
    </div>
  ));

  return (
    <div className="inbox-conversation">
      <div className="inbox-details">
        <div>
          <img alt="avatar" src={`https://api.adorable.io/avatars/${otherUser._id}`} />
        </div>
        <div>
          <h3>
            {otherUser.firstName} {otherUser.lastName}
          </h3>
          <p>{otherUser.tagline}</p>
        </div>
      </div>
      <div className="inbox-messages">
        <section className="inbox-overview">{$messages}</section>
      </div>
      <div className="inbox-reply">
        <textarea ref={$replyBar} />
        <button type="button" onClick={onClick}>
          Send
        </button>
      </div>
    </div>
  );
};

Conversation.defaultProps = {
  conversation: null
};

Conversation.propTypes = {
  onMessage: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  conversation: PropTypes.object
};

export default Conversation;
