import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dialog, TextInputField } from 'evergreen-ui';
import { API } from '../../../constants';
import RequestState from '../../../models/RequestState';

class PasswordResetForm extends Component {
  state = {
    passwordResetRequest: new RequestState()
  };

  requestPasswordReset = closeForm => {
    const email = this.emailNode.value;

    const { passwordResetRequest } = this.state;
    this.setState({ passwordResetRequest: passwordResetRequest.start() });
    return API.user
      .requestPasswordReset(email)
      .then(async () => {
        // show success
        closeForm();
        this.redirectToHome();
      })
      .catch(err => {
        // TODO show reason
        this.setState({ passwordResetRequest: passwordResetRequest.error(err) });
      });
  };

  redirectToHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { isLoading } = this.state.passwordResetRequest;

    return (
      <Dialog
        title="Reset your password"
        confirmLabel="Reset password"
        isShown
        onConfirm={this.requestPasswordReset}
        onCancel={this.redirectToHome}
        isConfirmLoading={isLoading}
      >
        <form className="modal-form">
          <TextInputField
            label="Email address"
            description="We'll send you an email with further instructions"
            name="email"
            type="email"
            innerRef={node => {
              this.emailNode = node;
            }}
          />
        </form>
        <Link className="yellow" to="/login">
          Back to login
        </Link>
      </Dialog>
    );
  }
}

PasswordResetForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default PasswordResetForm;
