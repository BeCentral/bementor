import React, { Component } from 'react';
import Filters from './Filters';
import AppContainer from '../../Containers/AppContainer';
import PageContainer from '../../Containers/PageContainer';
import MiniUser from './MiniUser';
import { API } from '../../../constants';

import '../../../assets/css/connect.css';

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

  filter = async (filters) => {
    const users = await API.user.find(filters.search);
    this.setState({
      users
    });
  };

  render() {
    const $users = this.state.users.map(user => <MiniUser key={user._id} {...user} />);

    return (
      <AppContainer>
        <PageContainer className="connect">
          <Filters onFilter={this.filter} />
          <div className="connect__results">
            <div className="connect__results__wrapper">
              {$users}
            </div>
          </div>
        </PageContainer>
      </AppContainer>
    );
  }
}

export default Users;
