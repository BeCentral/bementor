import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';
import { API, cookies } from '../../../constants';
import User from '../../../models/User';
import RequestState from '../../../models/RequestState';

class RegistrationForm extends Component {
  state = {
    loginRequest: new RequestState()
  }

  login = () => {
    const email = this.emailNode.value;
    const password = this.passwordNode.value;

    API.user.login({ email, password })
      .then((response) => {
        const { token } = response;
        delete response.token;
        cookies.set('auth', token, {
          secure: true,
          httpOnly: true
        });
        const user = new User(response);
        this.props.finish();
      });
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
            innerRef={(node) => { this.emailNode = node; }}
          />
          <TextInputField
            label="Password"
            name="password"
            type="password"
            required
            innerRef={(node) => { this.passwordNode = node; }}
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
