import React, {Component} from 'react';
import AppContainer from "../../Containers/AppContainer";
import PageContainer from "../../Containers/PageContainer";
import Wrapper from "../../Containers/Wrapper";
import ConversationOverview from "./ConversationOverview"
import NProgress from "nprogress";

import "../../../assets/css/inbox.css"
import {API} from "../../../constants";
import * as PropTypes from "prop-types";

function Profile(props) {

  let classes = 'inbox-profile';
  if (props.active === true) {
    classes += ' inbox-profile__active'
  }

  return (
    <div className={classes}>
      <p>
        <img alt="avatar" src={`https://api.adorable.io/avatars/${props.user._id}`}/>
      </p>
      <p>{props.user.firstName} {props.user.lastName}</p>
    </div>
  );
}

Profile.propTypes = {user: PropTypes.object, active: PropTypes.bool};

class Conversation extends Component {

  onClick = () => {
    this.props.onMessage(this.replybar.value);
  };

  renderMessages = () => {
    return this.props.conversation.messages.map((message) => {
      return (
        <div key={message._id} className="inbox-message inbox-message">
          <p>{message.text}</p>
        </div>
      )
    })
  };

  render() {
    if (!this.props.conversation) {
      return (
        <div className="inbox-conversation"/>
      );
    }

    const otherUser = this.props.conversation.mentor;

    return <div className="inbox-conversation">
      <div className="inbox-details">
        <div>
          <img alt="avatar" src={`https://api.adorable.io/avatars/${otherUser._id}`}/>
        </div>
        <div>
          <h3>{otherUser.firstName} {otherUser.lastName}</h3>
          <p>l{otherUser.tagline}</p>
        </div>
      </div>
      <div className="inbox-messages">
        {this.renderMessages()}
      </div>
      <div className="inbox-reply">
        <textarea ref={(node) => {
          this.replybar = node;
        }}></textarea>
        <button onClick={this.onClick}>Send</button>
      </div>
    </div>;
  }
}

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conversations: undefined
    };
    NProgress.start();
  }

  componentDidMount() {
    API.conversation.all().then((conversations) => {
      this.setState({
        conversations: conversations,
      });
      return conversations[0];
    }).then((conversation) => {
      return API.conversation.get(conversation._id);
    }).then((conversation) => {
      this.setState({
        current: conversation
      })
    })
      .finally(() => {
        NProgress.done()
      });
  }

  handleMessage = (message) => {
    API.conversation.message(this.state.current._id, message).then((conversation) => {
      return API.conversation.get(conversation._id);
    }).then((conversation) => {
      this.setState({
        current: conversation
      })
    })
  };

  renderConversations = () => {
    if (!this.state.conversations) {
      return [];
    }

    return this.state.conversations.map((conversation) => {
      const otherUser = conversation.mentor;
      return (
        <Profile key={conversation._id} user={otherUser}/>
      )
    })
  };

  render() {
    return (
      <AppContainer>
        <PageContainer>
          <Wrapper>
            <div className="inbox">
              <ConversationOverview>
                {this.renderConversations()}
              </ConversationOverview>
              <Conversation onMessage={this.handleMessage} conversation={this.state.current}/>
            </div>
          </Wrapper>
        </PageContainer>
      </AppContainer>
    )
  }

}

export default Index;
