import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';
import { API } from '../../../constants';
import RequestState from '../../../models/RequestState';

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
        type: 'password',
        description: 'Your password must be at least 8 characters long. Ideally you include numbers, symbols and capital letters. '
      },
      passwordConfirmation: {
        label: 'Confirm password',
        name: 'passwordConfirmation',
        required: true,
        type: 'password'
      }
    },
    createUserRequest: new RequestState()
  }

  register = () => {
    const { fields, createUserRequest } = this.state;

    const user = {};
    Object.keys(fields).forEach((key) => {
      user[key] = fields[key].value;
    });

    this.setState({ createUserRequest: createUserRequest.start() });
    API.user.register(user)
      .then((user) => {
        // TODO show success
        this.setState({ createUserRequest: createUserRequest.finish('Account registered successfully! You may now log in') });
        this.props.finish();
      })
      .catch((reason) => {
        // TODO show error
        this.setState({ createUserRequest: createUserRequest.error(reason) });
      });
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
          ...prevState.fields[fieldName],
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

    const regex = new RegExp(/\S+@\S+\.\S+/);
    if (!regex.test(email)) return 'Not a valid email address';
    return null;
  }

  validateFirstName = (name) => {
    if (!name) return 'First name is required';
    return null;
  }

  validateLastName = (name) => {
    if (!name) return 'Last name is required';
    return null;
  }

  validatePassword = (password) => {
    if (!password || password.length < 8) return 'Your password should be at least 8 characters long';
    return null;
  }

  validatePasswordConfirmation = (password) => {
    const passwordToMatch = this.state.fields.password.value;
    console.log(passwordToMatch);
    if (!password || !passwordToMatch || (passwordToMatch !== password)) return 'This password does not match the password in the previous field';
    return null;
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
    const { isLoading } = this.state.createUserRequest;
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
  cancel: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired
};

export default RegistrationForm;
