import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Connect from './Pages/Connect';
import Profile from './Pages/Profile';
import Login from './Pages/Auth/LoginForm';

class Routes extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;

    // set previousLocation if props.location is not modal
    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state
      && location.state.modal
      && this.previousLocation !== location
    );

    return (
      <>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/:path(|index|home|start)" component={Home} />
          <Route path="/connect" component={Connect} />
          <Route path="/profile/:userId" component={Profile} />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
        {isModal ? <Route path="/login" component={Login} /> : null}
      </>
    );
  }
}

Routes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default Routes;
