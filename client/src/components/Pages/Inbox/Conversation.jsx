import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

import '../../../assets/css/inbox.css';

const Conversation = ({ onMessage, conversation }) => {
  const { user } = useContext(AuthContext);
  const $replyBar = useRef(null);

  if (!conversation) return <div className="inbox-conversation" />;

  const onClick = () => {
    onMessage($replyBar.current.value);
    $replyBar.current.value = '';
  };

  const { messages } = conversation;
  const partner = conversation.with;

  if (!messages) return <p />;
  const $messages = messages.map(message => (
    <div key={message._id} className="inbox-message inbox-message">
      <p>{message.text}</p>
    </div>
  ));

  return (
    <div className="inbox-conversation">
      <div className="inbox-details">
        <div>
          <img alt="avatar" src={`https://api.adorable.io/avatars/${partner._id}`} />
        </div>
        <div>
          <h3>
            {partner.firstName} {partner.lastName}
          </h3>
          {partner.tagline && <p>{partner.tagline}</p>}
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
