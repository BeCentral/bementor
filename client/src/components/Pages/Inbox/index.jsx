import React, {Component} from 'react';
import AppContainer from "../../Containers/AppContainer";
import PageContainer from "../../Containers/PageContainer";
import Wrapper from "../../Containers/Wrapper";
import ConversationOverview from "./ConversationOverview"
import NProgress from "nprogress";

import "../../../assets/css/inbox.css"
import {API} from "../../../constants";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";
import AuthContext from "../../../context/auth-context";

class MiniConversation extends Component {

  static propTypes = {
    user: PropTypes.object,
    active: PropTypes.bool
  };

  static contextType = AuthContext;

  handleClick = () => {
    this.props.select(this.props.conversation)
  };

  render() {
    let otherUser = this.props.conversation.mentor;
    if (this.context.user.id === this.props.conversation.mentor) {
      otherUser = this.props.conversation.mentee;
    }

    let classes = 'inbox-profile';
    if (this.props.active === true) {
      classes += ' inbox-profile__active'
    }

    return (
      <div onClick={this.handleClick} className={classes}>
        <p>
          <img alt="avatar" src={`https://api.adorable.io/avatars/${otherUser._id}`}/>
        </p>
        <p>{otherUser.firstName} {otherUser.lastName}</p>
      </div>
    );
  }
}

class Conversation extends Component {

  static contextType = AuthContext;

  onClick = () => {
    this.props.onMessage(this.replybar.value);
    this.replybar.value = "";
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
    if (this.props.conversation === false) {
      return (
        <div className="inbox-conversation inbox-conversation__empty">
          <h3>Find a mentor and start chatting</h3>
          <p><Link to="/connect">Connect</Link></p>
        </div>
      );
    }

    if (!this.props.conversation) {
      return (
        <div className="inbox-conversation"/>
      );
    }

    let otherUser = this.props.conversation.mentor;
    if (this.context.user.id === this.props.conversation.mentor) {
      otherUser = this.props.conversation.mentee;
    }

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

class Inbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conversations: undefined,
      current: undefined
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
      if (!conversation) {
        this.setState({
          current: false
        });
        throw "No conversation yet"
      }
      return API.conversation.get(conversation._id);
    }).then((conversation) => {
      this.setState({
        current: conversation
      })
    })
    .catch(() => {
      // noop
    })
    .finally(() => {
      NProgress.done()
    });
  }

  handleSelect = (conversation) => {
    API.conversation.get(conversation._id).then((conversation) => {
      this.setState({
        current: conversation
      })
    })
    .catch(() => {
      // noop
    })
  };

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
      return (
        <MiniConversation select={this.handleSelect} conversation={conversation} key={conversation._id}/>
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

export default Inbox;
