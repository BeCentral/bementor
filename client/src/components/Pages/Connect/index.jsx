import React, { Component } from 'react';
import { SearchInput, Button } from 'evergreen-ui';
import AppContainer from '../../Containers/AppContainer';
import PageContainer from '../../Containers/PageContainer';
import MiniUser from './MiniUser';
import Wrapper from '../../Containers/FlexWrapper';
import { API } from '../../../constants';

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

  search = async () => {
    const users = await API.user.search(this.searchNode.value);
    this.setState({
      users
    });
  };

  render() {
    const $users = this.state.users.map(user => <MiniUser key={user._id} {...user} />);

    return (
      <AppContainer>
        <PageContainer>
          <h2>Connect.</h2>
          <SearchInput ref={(node) => { this.searchNode = node; }} name="query" placeholder="Search keywords" />
          <Button type="submit" onClick={this.search}>Search</Button>
          <Wrapper>
            {$users}
          </Wrapper>
        </PageContainer>
      </AppContainer>
    );
  }
}

export default Users;
