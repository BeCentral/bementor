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
  inbox: null,
  inboxRequest: new RequestState(true),
  initiateRequest: new RequestState(),
  currentConversation: null
};

const SET_INBOX = 'SET_INBOX';
const SET_INBOX_ERROR = 'SET_INBOX_ERROR';
const INITIATE_CONVO = 'INITIATE_CONVO';
const GET_CONVO_WITH_USER = 'GET_CONVO_WITH_USER';
const GET_MORE_MESSAGES_IN_CONVO = 'GET_MORE_MESSAGES_IN_CONVO';
const SELECT_CONVO = 'SELECT_CONVO';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_INBOX: {
      const conversations = action.payload.sort(
        (a, b) => new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime()
      );
      return {
        ...state,
        inbox: conversations,
        inboxRequest: state.inboxRequest.finish()
      };
    }
    case SET_INBOX_ERROR: {
      return {
        ...state,
        inboxRequest: state.inboxRequest.error(
          `Whoops! An unexpected error occurred while getting your inbox.`
        )
      };
    }
    case INITIATE_CONVO: {
      const newConversation = action.payload;
      if (!newConversation) return { ...state, initiateRequest: state.initiateRequest.start() };
      if (newConversation.error)
        return { ...state, initiateRequest: state.initiateRequest.error(newConversation.error) };
      const inbox = [newConversation, ...state.inbox];
      return {
        ...state,
        initiateRequest: state.initiateRequest.finish(),
        inbox,
        currentConversation: newConversation
      };
    }
    case SELECT_CONVO:
      return { ...state, currentConversation: action.payload };
    case GET_CONVO_WITH_USER:
      return { ...state };
    case GET_MORE_MESSAGES_IN_CONVO:
      return { ...state };
    default:
      throw new Error();
  }
};

const Inbox = ({ match }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { userId } = match.params;

  const startConversationWith = async partnerId => {
    dispatch({ type: INITIATE_CONVO });
    try {
      const conversation = await API.message.initiateWith(partnerId);
      dispatch({ type: INITIATE_CONVO, payload: conversation });
    } catch (err) {
      dispatch({ type: INITIATE_CONVO, payload: { error: err } });
    }
  };

  const selectConversation = withUserId => {
    if (!withUserId) return dispatch({ type: SELECT_CONVO, payload: state.inbox.conversations[0] });

    const conversation = state.inbox
      ? state.inbox.find(convo => convo.with._id === withUserId)
      : null;
    if (conversation) dispatch({ type: SELECT_CONVO, payload: conversation });
    return startConversationWith(withUserId);
  };

  useEffect(() => {
    NProgress.start();
    API.message
      .getAll()
      .then(conversations => {
        dispatch({ type: SET_INBOX, payload: conversations });
        selectConversation(userId);
      })
      .catch(err => dispatch({ type: SET_INBOX_ERROR, payload: err }))
      .finally(() => NProgress.done());
  }, []);

  useEffect(() => {
    if (!state.inbox) return;
    selectConversation(userId);
  }, [userId]);

  const handleSelect = conversation => {};

  const handleMessage = message => {};

  const renderEmptyMessageState = () => (
    <div className="inbox-conversation inbox-conversation__empty">
      <h3>Connect and start chatting</h3>
      <Button appearance="primary" intent="success">
        <Link className="seamless" to="/connect">
          Connect
        </Link>
      </Button>
    </div>
  );

  const renderMiniConversation = conversation => (
    <MiniConversation
      select={handleSelect}
      active={conversation.with._id === state.currentConversation.with._id}
      conversation={conversation}
      key={conversation.with._id}
    />
  );

  const $conversations =
    state.inbox && state.inbox.length > 0 ? (
      state.inbox.map(renderMiniConversation)
    ) : (
      <div className="inbox-overview__empty">No active conversations</div>
    );

  const $conversationContents = state.currentConversation ? (
    <Conversation onMessage={handleMessage} conversation={state.currentConversation} />
  ) : (
    renderEmptyMessageState()
  );

  return (
    <PageContainer>
      <div className="inbox">
        <section className="inbox-overview">{$conversations}</section>
        {$conversationContents}
      </div>
    </PageContainer>
  );
};

Inbox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired
};

export default withRouter(Inbox);
