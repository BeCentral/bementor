import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextInputField } from 'evergreen-ui';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    const fields = ['email', 'firstName', 'lastName', 'password', 'passwordConfirmation'];
    this.state = fields.reduce((state, fieldName) => {
      state.fields[fieldName] = { value: '', validationMessage: null };
      return state;
    }, { fields: {} });
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

  renderField = (label, fieldName, isRequired = false, type = 'text', description = null) => {
    const field = this.state.fields[fieldName];
    return (
      <TextInputField
        label={label}
        name={fieldName}
        value={field.value}
        isInvalid={!!field.validationMessage}
        validationMessage={field.validationMessage}
        onChange={this.handleFieldChanged}
        required={isRequired}
        type={type}
        description={description}
      />
    );
  }

  render() {
    const isLoading = false;
    return (
      <Dialog
        title="Register for BeMentor"
        confirmLabel="Register"
        isShown
        onConfirm={this.validateFields}
        isConfirmLoading={isLoading}
        onCloseComplete={this.props.cancel}
        isInvalid={!!this.validateEmail()}
        validationMessage={this.validateEmail()}
      >
        <form>
          {this.renderField('Email', 'email', true, 'This is purely for account recovery purposes. You will not receive any promotional emails.')}
          {this.renderField('First name', 'firstName', true)}
          {this.renderField('Last name', 'lastName', true)}
          {this.renderField('Password', 'password', true, 'password')}
          {this.renderField('Confirm password', 'passwordConfirmation', true, 'password')}
        </form>
      </Dialog>
    );
  }
}

RegistrationForm.propTypes = {
  cancel: PropTypes.func.isRequired
};

export default RegistrationForm;
