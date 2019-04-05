import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'evergreen-ui';

class RegistrationForm extends Component {
  register = () => {

  };

  render() {
    const isLoading = false;
    return (
      <Dialog
        title="Register for BeMentor"
        confirmLabel="Register"
        isShown
        onConfirm={this.register}
        isConfirmLoading={isLoading}
        onCloseComplete={this.props.cancel}
      >
        <form />
      </Dialog>
    );
  }
}

RegistrationForm.propTypes = {
  cancel: PropTypes.func.isRequired
};

export default RegistrationForm;
