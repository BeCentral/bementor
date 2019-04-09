import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { API } from '../../constants';
import AuthContext from '../../context/auth-context';

import '../../assets/css/header.css';

class Header extends Component {
  state = {
    isRegistering: false
  }

  doLogout = async () => {
    // TODO show logout state
    await API.user.logout();
    this.context.setAuthenticatedUser(null);
    // TODO show logout success
    this.props.history.push('/');
  }

  getModalLink = location => ({
    pathname: location,
    state: { modal: true }
  });

  render() {
    const currentUser = this.context.user;
    const isAuthenticated = !!currentUser;

    return (
      <>
        <header className="app-header">
          <div className="app-header__top">
            <h1><Link to="/">BeMentor.</Link></h1>
          </div>
          <nav className="app-header__navigation">
            <ul>
              <li><Link to="/connect">Connect</Link></li>
              { isAuthenticated && (
                <>
                  <li><Link to="#">Inbox</Link></li>
                  <li><Link to="/profile/5c851da63fc52b74c942680d">Profile</Link></li>
                  <li>|</li>
                  <li><button onClick={this.doLogout} type="button" className="button--link">Log out</button></li>
                </>
              )}
              { !isAuthenticated && (
                <>
                  <li>|</li>
                  <li>
                    <Link to={this.getModalLink('/login')}>
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link to={this.getModalLink('/register')}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
      </>
    );
  }
}

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(Header);

// including under export because https://stackoverflow.com/questions/53240058/use-hoist-non-react-statics-with-withrouter
Header.contextType = AuthContext;
