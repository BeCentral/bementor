import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { SideSheet, Avatar } from 'evergreen-ui';
import { API } from '../../constants';
import { NavItem } from '../UI';
import AuthContext from '../../context/auth-context';

import '../../assets/css/header.css';

const Header = ({ history, location }) => {
  const [topHeaderShown, setTopHeaderVisibility] = useState(true);
  const [mobileNavShown, setMobileNavVisibility] = useState(false);

  const { setAuthenticatedUser, user } = useContext(AuthContext);

  const toggleMobileNav = () => setMobileNavVisibility(!mobileNavShown);

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

  useEffect(() => {
    if (mobileNavShown) setMobileNavVisibility(false);
  }, [location.pathname]);

  const doLogout = async () => {
    // TODO show logout state
    await API.user.logout();
    setAuthenticatedUser(null);
    // TODO show logout success
    history.push('/');
  };

  const getModalLink = pathname => ({
    pathname,
    state: { modal: true }
  });

  const maybeRenderAvatar = () => {
    if (!user) return null;
    const { firstName, lastName } = user;
    return (
      <div className={`${mobileNavShown ? 'nav__avatar--mobile' : 'nav__avatar'}`}>
        <Avatar src={user.picture} size={35} name={`${user.firstName} ${user.lastName}`} />
        <h3 className="nav__avatar__name">
          {firstName} {lastName}
        </h3>
      </div>
    );
  };

  const $avatar = maybeRenderAvatar();
  const renderNavItems = () => {
    const isAuthenticated = !!user;
    return (
      <>
        <NavItem href="/connect">Connect</NavItem>
        {isAuthenticated && (
          <>
            <NavItem href="/inbox">Inbox</NavItem>
            <NavItem href={`/profile/${user._id}`}>Profile</NavItem>
            <li className="navigation__items__spacer">-</li>
            <li>
              <button onClick={doLogout} type="button" className="button--link">
                Log out
              </button>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li className="navigation__items__spacer">-</li>
            <NavItem href={getModalLink('/login')}>Log in</NavItem>
            <NavItem href={getModalLink('/register')}>Register</NavItem>
          </>
        )}
      </>
    );
  };

  const $navItems = renderNavItems();
  return (
    <>
      <SideSheet
        isShown={mobileNavShown}
        onCloseComplete={() => setMobileNavVisibility(false)}
        containerProps={{ className: 'mobile-nav' }}
        width={250}
      >
        <header className="mobile-nav__header">
          {$avatar}
          <ul className="navigation__items--mobile">{$navItems}</ul>
        </header>
      </SideSheet>
      <header className="app-header">
        <h1>
          <Link to="/">BeMentor.</Link>
        </h1>
      </header>
      <nav className={`navigation ${topHeaderShown ? '' : 'navigation--fixed'}`}>
        <h1 className={`navigation__title ${topHeaderShown ? '' : 'navigation__title--active'}`}>
          <Link to="/">BeMentor.</Link>
        </h1>
        <ul className="navigation__items">
          {$navItems}
          <li>{$avatar}</li>
        </ul>
        <div className="hamburger-container">
          <button
            type="button"
            className={`button--seamless hamburger ${mobileNavShown ? 'hamburger--hidden' : ''}`}
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
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
};

export default withRouter(Header);
