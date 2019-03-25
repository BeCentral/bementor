import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/css/wrapper.css';

const Wrapper = props => (
  <div className="app-wrapper">
    {props.children}
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default Wrapper;
