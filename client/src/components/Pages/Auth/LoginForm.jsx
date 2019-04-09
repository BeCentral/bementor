import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';
import { API } from '../../../constants';
import AuthContext from '../../../context/auth-context';
import User from '../../../models/User';
import RequestState from '../../../models/RequestState';

class LoginForm extends Component {
  state = {
    loginRequest: new RequestState()
  }

  login = (closeForm) => {
    const email = this.emailNode.value;
    const password = this.passwordNode.value;
    const { loginRequest } = this.state;

    this.setState({ loginRequest: loginRequest.start() });
    API.user.login({ email, password })
      .then(async (rawUser) => {
        const user = new User(rawUser);
        this.context.setAuthenticatedUser(user);
        closeForm();
      })
      .catch((err) => {
        // TODO show reason
        this.setState({ loginRequest: loginRequest.error(err) });
      });
  };

  exitForm = () => {
    const { loginRequest } = this.state;
    this.setState({ loginRequest: loginRequest.finish() });

    const query = new URLSearchParams(this.props.location.search);
    const redirect = query.get('redirect');
    if (!redirect) this.props.history.goBack();
    else this.props.history.push(redirect);
  }

  render() {
    const { isLoading } = this.state.loginRequest;

    return (
      <Dialog
        title="Log in to BeMentor"
        confirmLabel="Login"
        isShown
        onConfirm={this.login}
        isConfirmLoading={isLoading}
        onCloseComplete={this.exitForm}
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

LoginForm.contextType = AuthContext;

LoginForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
};

export default LoginForm;
