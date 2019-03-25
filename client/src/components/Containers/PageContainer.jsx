import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/css/page-container.css';

const PageContainer = props => (
  <div className="page-container">
    {props.children}
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageContainer;
