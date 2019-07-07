import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NProgress from 'nprogress';
import PageContainer from '../../Containers/PageContainer';
import { API } from '../../../constants';
import Conversation from './Conversation';
import MiniConversation from './MiniConversation';

import '../../../assets/css/inbox.css';

const Inbox = ({ match }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  const { userId } = match.params;

  useEffect(() => {
    NProgress.start();
    API.conversation.all()
      .then((convos) => {
        setConversations(convos);
        return convos[0];
      })
      .then(async (conversation) => {
        if (userId) {
          const convo = await API.conversation.getOneWithUser(userId);
          if (convo) return convo;
        }
        if (!conversation) setCurrentConversation(null);
        return API.conversation.get(conversation._id);
      })
      .then(conversation => setCurrentConversation({ current: conversation }))
      .catch(() => { /* noop */ })
      .finally(() => NProgress.done());
  }, []);

  const handleSelect = (conversation) => {
    API.conversation.get(conversation._id)
      .then(convo => setCurrentConversation({ current: convo }))
      .catch(() => { /* noop */ });
  };

  const handleMessage = (message) => {
    API.conversation.message(currentConversation._id, message)
      .then(conversation => API.conversation.get(conversation._id))
      .then(conversation => setCurrentConversation(conversation));
  };

  const $conversations = conversations.map(conversation => (
    <MiniConversation
      select={handleSelect}
      conversation={conversation}
      key={conversation._id}
    />
  ));

  return (
    <PageContainer>
      <div className="inbox">
        <section className="inbox-overview">{$conversations}</section>
        <Conversation onMessage={handleMessage} conversation={currentConversation} />
      </div>
    </PageContainer>
  );
};

Inbox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired
};

export default withRouter(Inbox);
