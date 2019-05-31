import React, { Component } from 'react';
import NProgress from 'nprogress';
import Filters from './Filters';
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
    NProgress.start();
    const users = await API.user.get();

    await this.setState({ users });
    NProgress.done();
  }

  filter = async (filters) => {
    NProgress.start();
    const users = await API.user.find(filters.search);
    this.setState({ users });
    NProgress.done();
  }

  render() {
    const $users = this.state.users.map(user => <MiniUser key={user._id} {...user} />);

    return (
      <PageContainer className="connect">
        <Filters onFilter={this.filter} />
        <div className="connect__results">
          <h2 className="center">Connect.</h2>
          <div className="connect__results__wrapper">
            {$users}
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default Users;
