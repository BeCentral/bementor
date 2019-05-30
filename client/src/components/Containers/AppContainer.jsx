import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { PageTransition } from '../UI';

const AppContainer = ({ location, children }) => (
  <div className="app-container">
    <Header />
    <PageTransition location={location}>
      {children}
    </PageTransition>
    <Footer />
  </div>
);

AppContainer.defaultProps = {
  children: <p />
};

AppContainer.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
};

export default withRouter(AppContainer);
