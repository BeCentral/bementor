import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:path(|index|home|start)" component={Home} />
      <Route path="/connect" component={Users} />
      <Route render={() => <p>Page not found</p>} />
    </Switch>
  </BrowserRouter>
);

export default App;
