import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Connect from './Pages/Connect';
import Profile from './Pages/Profile';

class Routes extends Component {
  state = {}

  render() {
    return (
      <Switch>
        <Route path="/:path(|index|home|start)" component={Home} />
        <Route path="/connect" component={Connect} />
        <Route path="/profile/:userId" component={Profile} />
        <Route render={() => <p>Page not found</p>} />
      </Switch>
    );
  }
}

export default Routes;
