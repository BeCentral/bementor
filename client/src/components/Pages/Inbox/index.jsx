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
  inboxRequest: new RequestState(),
  initiateRequest: new RequestState(),
  sendRequest: new RequestState(),
  currentConversation: null
};

const SET_INBOX = 'SET_INBOX';
const SET_INBOX_ERROR = 'SET_INBOX_ERROR';
const INITIATE_CONVO = 'INITIATE_CONVO';
const SELECT_CONVO = 'SELECT_CONVO';
const SEND_MESSAGE = 'SEND_MESSAGE';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_INBOX: {
      if (!action.payload) return { ...state, inboxRequest: state.inboxRequest.start() };

      const { conversations, userId } = action.payload;
      const inbox = conversations.sort(
        (a, b) => new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime()
      );
      const selectedConvo = userId ? inbox.find(convo => convo.with._id === userId) : null;
      const currentConversation = selectedConvo || inbox[0];
      return {
        ...state,
        inbox,
        currentConversation,
        inboxRequest: state.inboxRequest.finish()
      };
    }
    case SET_INBOX_ERROR: {
      const error = `Whoops! An unexpected error occurred while getting your inbox.`;
      return {
        ...state,
        inboxRequest: state.inboxRequest.error(error)
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
    case SEND_MESSAGE: {
      const newMessage = action.payload;
      if (!newMessage) return { ...state, sendRequest: state.sendRequest.start() };
      if (newMessage.error)
        return { ...state, sendRequest: state.sendRequest.error(newMessage.error) };
      const inbox = [...state.inbox];
      const i = inbox.findIndex(convo => convo.with._id === state.currentConversation.with._id);
      inbox[i].messages.push(newMessage);
      inbox[i].lastActivity = new Date();
      return { ...state, conversations: inbox };
    }
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
    if (state.currentConversation && state.currentConversation.with._id === withUserId) return null;
    if (!withUserId) return dispatch({ type: SELECT_CONVO, payload: state.inbox[0] });

    const conversation = state.inbox
      ? state.inbox.find(convo => convo.with._id === withUserId)
      : null;
    if (conversation) dispatch({ type: SELECT_CONVO, payload: conversation });
    return startConversationWith(withUserId);
  };

  useEffect(() => {
    dispatch({ type: SET_INBOX });
    NProgress.start();
    API.message
      .getAll()
      .then(conversations => {
        dispatch({ type: SET_INBOX, payload: { conversations, userId } });
      })
      .catch(err => dispatch({ type: SET_INBOX_ERROR, payload: err }))
      .finally(() => NProgress.done());
  }, []);

  useEffect(() => {
    if (!state.inbox) return;
    selectConversation(userId);
  }, [state.inboxRequest.isLoading, userId]);

  const handleSelect = conversation => {};

  const handleMessage = async message => {
    dispatch({ type: SEND_MESSAGE });
    try {
      const newMessage = await API.message.send(state.currentConversation.with._id, message);
      dispatch({ type: SEND_MESSAGE, payload: newMessage });
    } catch (err) {
      dispatch({ type: SEND_MESSAGE, payload: { error: err } });
    }
  };

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
