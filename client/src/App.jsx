import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/auth-context';
import Home from './components/Pages/Home';
import Connect from './components/Pages/Connect';
import Profile from './components/Pages/Profile';
import User from './models/User';
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
        this.setAuthenticatedUser(null);
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
          <Switch>
            <Route path="/:path(|index|home|start)" component={Home} />
            <Route path="/connect" component={Connect} />
            <Route path="/profile/:userId" component={Profile} />
            <Route render={() => <p>Page not found</p>} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
