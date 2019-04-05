import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../Pages/Auth/RegistrationForm';

import '../../assets/css/header.css';

class Header extends Component {
  state = {
    isRegistering: false,
    isLoggingIn: false
  }

  startLogin = () => {
    this.setState({ isLoggingIn: true });
  }

  startRegistration = () => {
    this.setState({ isRegistering: true });
  }

  cancelLogin = () => {
    this.setState({ isLoggingIn: false });
  }

  stopRegistration = () => {
    this.setState({ isRegistering: false });
  }

  render() {
    const { isRegistering, isLoggingIn } = this.state;
    return (
      <>
        {isRegistering && (
          <RegistrationForm cancel={this.stopRegistration} finish={this.stopRegistration} />
        )}
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
              <li><button onClick={this.startLogin} type="button" className="button--link">Log in</button></li>
              <li><button onClick={this.startRegistration} type="button" className="button--link">Register</button></li>
            </ul>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
