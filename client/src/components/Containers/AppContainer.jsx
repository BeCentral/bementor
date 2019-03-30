import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

import '../../assets/css/container.css';

const AppContainer = props => (
  <div className="app-container">
    <Header />
    {props.children}
    <Footer />
  </div>
);

AppContainer.defaultProps = {
  children: <p />
};

AppContainer.propTypes = {
  children: PropTypes.node
};

export default AppContainer;
