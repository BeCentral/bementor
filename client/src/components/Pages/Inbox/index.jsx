import React, { Component } from 'react';
import AppContainer from "../../Containers/AppContainer";
import PageContainer from "../../Containers/PageContainer";
import Wrapper from "../../Containers/Wrapper";
import ConversationOverview from "./ConversationOverview"

import "../../../assets/css/inbox.css"
import {Avatar} from "evergreen-ui";

class Index extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <AppContainer>
          <PageContainer>
            <Wrapper>
              <div className="inbox">
                <ConversationOverview>
                  <div className="inbox-profile">
                    <p>
                      <img alt="avatar" src={`https://api.adorable.io/avatars/adlkfsjdf`} />
                    </p>
                    <p>Anthony Meirlaen</p>
                  </div>
                </ConversationOverview>
                <div className="inbox-conversation">
                  <div className="inbox-details">
                    <div>
                      <img alt="avatar" src={`https://api.adorable.io/avatars/adlkfsjdf`} />
                    </div>
                    <div>
                      <h3>Anthony Meirlaen</h3>
                      <p>lorem ipsum dolor sit amet funcus nominis elarsus</p>
                    </div>
                  </div>
                  <div className="inbox-messages">
                     <div className="inbox-message inbox-message">
                       <p>Hello</p>
                     </div>

                    <div className="inbox-message inbox-message__right">
                      <p>Hello</p>
                    </div>
                  </div>
                  <div className="inbox-reply">
                    <textarea></textarea>
                    <button>Send</button>
                  </div>
                </div>
              </div>
            </Wrapper>
          </PageContainer>
      </AppContainer>
    )
  }

}

export default Index;
