import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Pages/Home';
import Connect from './components/Pages/Connect';
import Profile from './components/Pages/Profile';
import User from './models/User';

const App = () => {
  const user = new User({
    firstName: 'Michiel',
    lastName: 'Leyman',
    picture: 'https://avatars3.githubusercontent.com/u/15386836?s=460&v=4',
    interests: ['Developing', 'Eating', 'Sleeping', 'Repeating'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tagline: 'I make useful things for other humans',
    location: 'Brussels',
    twitter: 'MichielLeyman',
    github: 'MichielLeyman'
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:path(|index|home|start)" component={Home} />
        <Route path="/connect" component={Connect} />
        <Route path="/profile" render={() => <Profile user={user} />} />
        <Route render={() => <p>Page not found</p>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
