import React, {Component, Fragment} from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';
import SearchBar from './SearchBar';
import {getUsers, findUsers} from "../api/users";
import MiniUser from "./MiniUser";
import Wrapper from "./Wrapper";

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    const users = await getUsers();

    this.setState({
      users: users
    })
  }

  search = async (query) => {
    const users = await findUsers(query);
    this.setState({
      users: users
    })
  };

  render() {

    const $users = this.state.users.map((user, index) => {
      return <MiniUser key={user._id} {...user} />
    });

    return (
      <Fragment>
        <Header/>
        <Container>
          <h2>Find your Guru</h2>

          <SearchBar onSearch={this.search}/>
          <Wrapper>
            {$users}
          </Wrapper>
        </Container>
        <Footer/>
      </Fragment>
    )
  }
}

export default Users;
