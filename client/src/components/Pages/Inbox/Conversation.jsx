import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Avatar, Button } from 'evergreen-ui';
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
    <div key={message._id} className="inbox__conversation__message">
      <p>{message.body}</p>
    </div>
  ));

  return (
    <div className="inbox__conversation">
      <div className="inbox__conversation__partner">
        <div className="inbox__conversation__partner__avatar">
          <Avatar
            src={partner.picture}
            size={52}
            name={`${partner.firstName} ${partner.lastName}`}
          />
        </div>
        <h2>
          <Link to={`/profile/${partner._id}`}>
            {partner.firstName} {partner.lastName}
          </Link>
        </h2>
        <Button className="inbox__conversation__partner__cta" iconBefore="people" size={28}>
          View profile
        </Button>
      </div>
      <section className="inbox__conversation__messages">{$messages}</section>
      <div className="inbox__conversation__reply">
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
