import React, { Component } from 'react';
import AppContainer from '../../Containers/AppContainer';
import PageContainer from '../../Containers/PageContainer';
import SearchBar from './SearchBar';
import MiniUser from './MiniUser';
import Wrapper from '../../Containers/Wrapper';
import { API } from '../../../constants';
import { Redirect } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    const users = await API.user.get();

    this.setState({
      users
    });
  }

  search = async (query) => {
    const users = await API.user.search(query);
    this.setState({
      users
    });
  };

  connect = async (userId) => {
    await API.conversation.initiate(userId);

    this.setState({
      redirectToInbox: true
    })
  };

  render() {

    if (this.state.redirectToInbox === true) {
      return <Redirect to="/inbox"/>
    }

    const $users = this.state.users.map(user => <MiniUser key={user._id} {...user} connect={this.connect} />);

    return (
      <AppContainer>
        <PageContainer>
          <h2>Find your Guru</h2>
          <SearchBar onSearch={this.search} />
          <Wrapper>
            {$users}
          </Wrapper>
        </PageContainer>
      </AppContainer>
    );
  }
}

export default Users;
