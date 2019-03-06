import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../assets/css/header.css';

const Header = props => {
  return (
    <header className="app-header">
      <div className="app-header__top">
        <h1>BeMentor.</h1>
      </div>
      <nav className="app-header__navigation">
        <ul>
          <li><Link to="#">Connect</Link></li>
          <li><Link to="#">Contact</Link></li>
          <li><Link to="#">Inbox</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
