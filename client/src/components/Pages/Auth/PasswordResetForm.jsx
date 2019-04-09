import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';
import RequestState from '../../../models/RequestState';

class PasswordResetForm extends Component {
  state = {
    passwordResetRequest: new RequestState()
  }

  resetPassword = (closeForm) => {

  };

  exitForm = () => {
    this.props.history.push('/login?redirect=home');
  }

  render() {
    const { isLoading } = this.state.passwordResetRequest;

    return (
      <Dialog
        title="Reset your password"
        confirmLabel="Reset password"
        isShown
        onConfirm={this.resetPassword}
        isConfirmLoading={isLoading}
        onCloseComplete={this.exitForm}
      >
        <form>
          <TextInputField
            label="Password"
            name="password"
            type="password"
            innerRef={(node) => { this.passwordNode = node; }}
            required
          />
          <TextInputField
            label="Confirm password"
            name="confirmationPassword"
            type="confirmationPassword"
            innerRef={(node) => { this.confirmationPasswordNode = node; }}
            required
          />
        </form>
      </Dialog>
    );
  }
}

PasswordResetForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default PasswordResetForm;
