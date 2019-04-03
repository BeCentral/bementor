import React, { Component } from 'react';
import { Dialog } from 'evergreen-ui';

class Register extends Component {
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
        onCloseComplete={this.cancelProfileUpdate}
      >
        <form />
      </Dialog>
    );
  }
}

export default Register;
