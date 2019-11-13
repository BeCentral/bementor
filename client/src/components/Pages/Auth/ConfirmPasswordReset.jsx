import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';
import { API } from '../../../constants';
import RequestState from '../../../models/RequestState';

class PasswordResetForm extends Component {
  state = {
    passwordResetRequest: new RequestState(),
    passwordsMatch: true
  };

  resetPassword = closeForm => {
    const password = this.passwordNode.value;
    const confirmationPassword = this.confirmationPasswordNode.value;

    if (password !== confirmationPassword) return this.setState({ passwordsMatch: false });

    const { passwordResetRequest } = this.state;
    const { token } = this.props.match.params;
    this.setState({ passwordResetRequest: passwordResetRequest.start() });
    return API.user
      .resetPassword(password, token)
      .then(async () => {
        // show success
        closeForm();
        this.redirectToLogin();
      })
      .catch(err => {
        // TODO show reason
        this.setState({ passwordResetRequest: passwordResetRequest.error(err) });
      });
  };

  updatePasswordMatchState = () => {
    this.setState({ passwordsMatch: true });
  };

  redirectToLogin = () => {
    this.props.history.push('/login?redirect=home');
  };

  redirectToHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { isLoading } = this.state.passwordResetRequest;
    const { passwordsMatch } = this.state;

    return (
      <Dialog
        title="Reset your password"
        confirmLabel="Reset password"
        isShown
        onConfirm={this.resetPassword}
        onCancel={this.redirectToHome}
        isConfirmLoading={isLoading}
        onCloseComplete={this.exitForm}
      >
        <form className="modal-form">
          <TextInputField
            label="Password"
            name="password"
            type="password"
            innerRef={node => {
              this.passwordNode = node;
            }}
            required
          />
          <TextInputField
            label="Confirm password"
            name="confirmationPassword"
            type="password"
            validationMessage={!passwordsMatch ? "Your passwords don't match" : null}
            isInvalid={!passwordsMatch}
            onChange={this.updatePasswordMatchState}
            innerRef={node => {
              this.confirmationPasswordNode = node;
            }}
            required
          />
        </form>
      </Dialog>
    );
  }
}

PasswordResetForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired
};

export default PasswordResetForm;
