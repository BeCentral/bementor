import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { API } from '../../constants';
import AuthContext from '../../context/auth-context';

import '../../assets/css/header.css';

const Header = ({ history }) => {
  const doLogout = async () => {
    // TODO show logout state
    await API.user.logout();
    const { setAuthenticatedUser } = useContext(AuthContext);
    setAuthenticatedUser(null);
    // TODO show logout success
    history.push('/');
  };

  const getModalLink = location => ({
    pathname: location,
    state: { modal: true }
  });

  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;

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
                <li><Link to={`/profile/${user._id}`}>Profile</Link></li>
                <li>|</li>
                <li><button onClick={doLogout} type="button" className="button--link">Log out</button></li>
              </>
            )}
            { !isAuthenticated && (
              <>
                <li>|</li>
                <li>
                  <Link to={getModalLink('/login')}>
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to={getModalLink('/register')}>
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
};

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(Header);
