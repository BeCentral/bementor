import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';
import { API } from '../../../constants';
import RequestState from '../../../models/RequestState';

class RegistrationForm extends Component {
  state = {
    loginRequest: new RequestState()
  }

  login = () => {

  };

  render() {
    const { isLoading } = this.state.loginRequest;

    return (
      <Dialog
        title="Log in to BeMentor"
        confirmLabel="Login"
        isShown
        onConfirm={this.login}
        isConfirmLoading={isLoading}
        onCloseComplete={this.props.cancel}
      >
        <form>
          <TextInputField
            label="Email"
            name="email"
            type="email"
            required
          />
          <TextInputField
            label="Password"
            name="password"
            type="password"
            required
          />
        </form>
      </Dialog>
    );
  }
}

RegistrationForm.propTypes = {
  cancel: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired
};

export default RegistrationForm;
