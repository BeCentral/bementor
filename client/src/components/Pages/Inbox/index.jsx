import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import NProgress from 'nprogress';
import { Button } from 'evergreen-ui';
import PageContainer from '../../Containers/PageContainer';
import { API } from '../../../constants';
import Conversation from './Conversation';
import MiniConversation from './MiniConversation';

import '../../../assets/css/inbox.css';
import RequestState from '../../../models/RequestState';

const initialState = {
  inbox: [],
  inboxRequest: new RequestState(true),
  currentConversation: null
};

const GET_INBOX = 'GET_INBOX';
const GET_INBOX_ERROR = 'GET_INBOX_ERROR';
const GET_CONVO_WITH_USER = 'GET_CONVO_WITH_USER';
const GET_CONVO_WITH_ID = 'GET_CONVO_WITH_ID';
const GET_MORE_MESSAGES_IN_CONVO = 'GET_MORE_MESSAGES_IN_CONVO';
const SELECT_CONVO = 'SELECT_CONVO';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_INBOX: {
      const rawConversations = action.payload;
      const conversations = Object.keys(rawConversations)
        .map(user => rawConversations[user])
        .sort((a, b) => new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime());
      return { ...state, inbox: conversations, currentConversation: conversations[0] };
    }
    case GET_CONVO_WITH_USER:
      return { ...state };
    case GET_CONVO_WITH_ID:
      return { ...state };
    case GET_MORE_MESSAGES_IN_CONVO:
      return { ...state };
    case SELECT_CONVO:
      return { ...state };
    case GET_INBOX_ERROR:
      return { ...state };
    default:
      throw new Error();
  }
};

const Inbox = ({ match }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { userId } = match.params;

  useEffect(() => {
    NProgress.start();
    API.message
      .getAll()
      .then(conversations => {
        dispatch({ type: GET_INBOX, payload: conversations });
      })
      .catch(err => {
        dispatch({ type: GET_INBOX_ERROR, payload: err });
      })
      .finally(() => NProgress.done());
  }, []);

  const handleSelect = conversation => {};

  const handleMessage = message => {};

  const $conversations = state.inbox.map(conversation => {
    const active = conversation.id === state.currentConversation;
    return (
      <MiniConversation
        select={handleSelect}
        active={active}
        conversation={conversation}
        key={conversation.with}
      />
    );
  });

  return (
    <PageContainer>
      <div className="inbox">
        <section className="inbox-overview">{$conversations}</section>
        {state.currentConversation && (
          <Conversation onMessage={handleMessage} conversation={state.currentConversation} />
        )}
        {!state.currentConversation && (
          <div className="inbox-conversation inbox-conversation__empty">
            <h3>Find a mentor and start chatting</h3>
            <Button appearance="primary" intent="success">
              <Link className="seamless" to="/connect">
                Connect
              </Link>
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

Inbox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired
};

export default withRouter(Inbox);
