import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import Profile from './components/Pages/Profile';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:path(|index|home|start)" component={Home} />
      <Route path="/connect" component={Users} />
      <Route path="/profile" component={Profile} />
      <Route render={() => <p>Page not found</p>} />
    </Switch>
  </BrowserRouter>
);

export default App;
