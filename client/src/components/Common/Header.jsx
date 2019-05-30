import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { API } from '../../constants';
import AuthContext from '../../context/auth-context';

import '../../assets/css/header.css';

const Header = ({ history }) => {
  const [topHeaderShown, setTopHeaderVisibility] = useState(true);
  const [mobileNavShown, setMobileNavVisibility] = useState(false);

  const { setAuthenticatedUser, user } = useContext(AuthContext);

  const handleScroll = () => {
    // 180 is header height
    if (window.pageYOffset >= 180) return setTopHeaderVisibility(false);
    return setTopHeaderVisibility(true);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const doLogout = async () => {
    // TODO show logout state
    await API.user.logout();
    setAuthenticatedUser(null);
    // TODO show logout success
    history.push('/');
  };

  const getModalLink = location => ({
    pathname: location,
    state: { modal: true }
  });

  const toggleMobileNav = () => setMobileNavVisibility(!mobileNavShown);

  const renderNavItems = () => {
    const isAuthenticated = !!user;
    return (
      <>
        <li><Link to="/connect">Connect</Link></li>
        { isAuthenticated && (
          <>
            <li><Link to="/connect">Inbox</Link></li>
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
      </>
    );
  };

  const $navItems = renderNavItems();
  return (
    <>
      <header className="app-header">
        <h1><Link to="/">BeMentor.</Link></h1>
      </header>
      <nav className={`navigation ${topHeaderShown ? '' : 'navigation--fixed'}`}>
        <h1 className={`navigation__title ${topHeaderShown ? '' : 'navigation__title--active'}`}>
          <Link to="/">BeMentor.</Link>
        </h1>
        <ul className="navigation__items">
          {$navItems}
        </ul>
        <div className="hamburger-container">
          <button
            type="button"
            className={`button--seamless hamburger ${mobileNavShown ? 'hamburger--open' : ''}`}
            onClick={toggleMobileNav}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className={`nav-spacer ${topHeaderShown ? '' : 'nav-spacer--active'}`} />
    </>
  );
};

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(Header);
