import React, { Component } from 'react';
import AppContainer from './Containers/AppContainer';
import PageContainer from './Containers/PageContainer';
import SearchBar from './SearchBar';
import { getUsers, findUsers } from '../api/users';
import MiniUser from './MiniUser';
import Wrapper from './Containers/Wrapper';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    const users = await getUsers();

    this.setState({
      users
    });
  }

  search = async (query) => {
    const users = await findUsers(query);
    this.setState({
      users
    });
  };

  render() {
    const $users = this.state.users.map(user => <MiniUser key={user._id} {...user} />);

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
