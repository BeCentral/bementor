import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/header.css';

const Header = () => (
  <header className="app-header">
    <div className="app-header__top">
      <h1><Link to="/">BeMentor.</Link></h1>
    </div>
    <nav className="app-header__navigation">
      <ul>
        <li><Link to="/connect">Connect</Link></li>
        {/* <li><Link to="#">Inbox</Link></li>--> */}
        {/* <li><Link to="/profile/5c851da63fc52b74c942680d">Profile</Link></li> */}
        <li>|</li>
        <li><button type="button" className="button--link">Log in</button></li>
        <li><button type="button" className="button--link">Register</button></li>
      </ul>
    </nav>
  </header>
);

export default Header;
