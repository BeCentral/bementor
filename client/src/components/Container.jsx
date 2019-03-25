import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/container.css';

const Container = props => (
  <div className="app-container">
    {props.children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
