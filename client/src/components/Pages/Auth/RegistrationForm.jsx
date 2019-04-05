import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';

class RegistrationForm extends Component {
  state = {
    fields: {
      email: {
        label: 'Email',
        name: 'email',
        required: true,
        description: 'This is purely for account recovery purposes. You will not receive any promotional emails.'
      },
      firstName: {
        label: 'First name',
        name: 'firstName',
        required: true
      },
      lastName: {
        label: 'Last name',
        name: 'lastName',
        required: true
      },
      password: {
        label: 'Password',
        name: 'password',
        required: true,
        type: 'password'
      },
      passwordConfirmation: {
        label: 'Confirm password',
        name: 'passwordConfirmation',
        required: true,
        type: 'password'
      }
    }
  }

  register = () => {

  };

  capitalizeFirst = s => s.charAt(0).toUpperCase() + s.slice(1);

  handleFieldChanged = (e) => {
    this.setFieldValue(e.currentTarget.name, e.currentTarget.value);
  }

  setFieldValue = (fieldName, fieldValue) => {
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [fieldName]: {
          value: fieldValue,
          validationMessage: null
        }
      }
    }));
  }

  validateFields = () => {
    const { fields } = this.state;

    let passed = true;
    Object.keys(fields).forEach((fieldName) => {
      const validator = `validate${this.capitalizeFirst(fieldName)}`;
      if (!this[validator]) return;

      const { value } = fields[fieldName];
      const validationMessage = this[validator](value);
      if (validationMessage) passed = false;
      fields[fieldName].validationMessage = validationMessage;
    });

    if (!passed) return this.setState(fields);
    return this.register();
  }

  validateEmail = (email) => {
    if (!email) return 'Email is required';
    return '';
  }

  renderField = (fieldName) => {
    const field = this.state.fields[fieldName];
    return (
      <TextInputField
        key={fieldName}
        label={field.label}
        name={fieldName}
        value={field.value || ''}
        isInvalid={!!field.validationMessage}
        validationMessage={field.validationMessage || null}
        onChange={this.handleFieldChanged}
        required={field.required || false}
        type={field.type || 'text'}
        description={field.description || null}
      />
    );
  }

  render() {
    const isLoading = false;
    const $fields = Object.keys(this.state.fields).map(this.renderField);

    return (
      <Dialog
        title="Register for BeMentor"
        confirmLabel="Register"
        isShown
        onConfirm={this.validateFields}
        isConfirmLoading={isLoading}
        onCloseComplete={this.props.cancel}
      >
        <form>{$fields}</form>
      </Dialog>
    );
  }
}

RegistrationForm.propTypes = {
  cancel: PropTypes.func.isRequired
};

export default RegistrationForm;
