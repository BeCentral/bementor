import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { defaultTheme } from 'evergreen-ui';
import merge from 'lodash/merge';
import AuthContext from './context/auth-context';
import User from './models/User';
import Routes from './components/Routes';
import { API } from './constants';

// see https://github.com/segmentio/evergreen/issues/542
merge(defaultTheme, {
  typography: {
    fontFamilies: {
      display: '"Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      ui: '"Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      mono: '"Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }
  }
});

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
