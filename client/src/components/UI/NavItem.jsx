import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const NavItem = ({
  location, href, children, className
}) => {
  const isActive = href === location.pathname;
  return (
    <li className={`navigation-item ${className} ${isActive ? 'active' : ''}`}>
      <Link to={href}>
        {children}
      </Link>
    </li>
  );
};

NavItem.defaultProps = {
  className: ''
};

NavItem.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
};

export default withRouter(NavItem);
