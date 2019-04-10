import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthContext from './context/auth-context';
import User from './models/User';
import Routes from './components/Routes';
import { API } from './constants';

class App extends Component {
  state = { user: null }

  componentDidMount() {
    API.user.authenticate()
      .then((user) => {
        this.setAuthenticatedUser(new User(user));
      })
      .catch((err) => {
        // TODO show err
      });
  }

  setAuthenticatedUser = user => this.setState({ user });

  render() {
    const authContext = {
      user: this.state.user,
      setAuthenticatedUser: this.setAuthenticatedUser
    };

    return (
      <AuthContext.Provider value={authContext}>
        <BrowserRouter>
          <Route component={Routes} />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
