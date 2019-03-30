import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  Label,
  Textarea,
  TextInputField,
  Button
} from 'evergreen-ui';
import User from '../../../models/User';

class ProfileEditor extends Component {
  state = {
    fields: {}
  };

  componentDidMount() {
    const { user } = this.props;
    Object.keys(user).forEach((prop) => {
      this.setFieldValue(prop, user[prop]);
    });
  }

  toMethodName = name => name.charAt(0).toUpperCase() + name.slice(1)

  submitEdits = (e) => {
    e.preventDefault();

    const { fields } = this.state;
    let passed = true;
    Object.keys(fields).forEach((field) => {
      const error = this.validate(field, fields[field].value);
      if (!error) return;
      passed = false;
      fields[field].validationMessage = error;
    });

    if (passed) {
      // submit to server
    } else {
      this.setState({ fields });
    }
  }

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

  getFieldValue = (field) => {
    const { fields } = this.state;
    if (!fields[field]) return '';
    return fields[field].value;
  }

  getValidationMessage = (field) => {
    const { fields } = this.state;
    if (!fields[field]) return null;
    return fields[field].validationMessage;
  }

  isInvalid = field => !!this.getValidationMessage(field);

  validate = (fieldName, value) => {
    const methodName = `validate${this.toMethodName(fieldName)}`;
    if (!this[methodName]) return null;
    return this[methodName](value);
  }

  validateTagline = (value) => {
    if (value.length > 60) return 'Your tagline exceeds the maximum length of 60 characters.';
    return null;
  }

  validateTwitter = (value) => {
    if (value.length === 0) return null;
    if (value.length > 15) return 'Your Twitter handle exceeds the maximum length of 15 characters.';

    const regex = RegExp(/(\w){1,15}$/);
    if (!regex.test(value)) return 'Your Twitter handle is invalid';
    return null;
  }

  validateGithub = (value) => {
    if (value.length === 0) return null;

    const regex = RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
    if (!regex.test(value)) return 'Your GitHub username is invalid';
    return null;
  }

  render() {
    const { user } = this.props;

    return (
      <form onSubmit={this.submitEdits}>
        <TextInputField
          label="First name"
          name="firstName"
          value={this.getFieldValue('firstName')}
          isInvalid={this.isInvalid('firstName')}
          validationMessage={this.getValidationMessage('firstName')}
          onChange={this.handleFieldChanged}
          required
        />

        <TextInputField
          label="Last name"
          name="lastName"
          value={this.getFieldValue('lastName')}
          isInvalid={this.isInvalid('lastName')}
          validationMessage={this.getValidationMessage('lastName')}
          onChange={this.handleFieldChanged}
          required
        />

        <TextInputField
          label="Tagline"
          name="tagline"
          description="A short description about yourself that will be displayed on the connect page"
          value={this.getFieldValue('tagline')}
          isInvalid={this.isInvalid('tagline')}
          validationMessage={this.getValidationMessage('tagline')}
          onChange={this.handleFieldChanged}
        />

        <TextInputField
          label="Location"
          name="location"
          value={this.getFieldValue('location')}
          isInvalid={this.isInvalid('location')}
          validationMessage={this.getValidationMessage('location')}
          onChange={this.handleFieldChanged}
        />

        <Pane className="modal__form-field">
          <Label className="modal__label" htmlFor="field--bio">About {user.firstName}</Label>
          <Textarea
            id="field--bio"
            name="bio"
            value={this.getFieldValue('bio')}
            isInvalid={this.isInvalid('bio')}
            onChange={this.handleFieldChanged}
          />
        </Pane>

        <TextInputField
          label="Twitter handle"
          name="twitter"
          value={this.getFieldValue('twitter')}
          isInvalid={this.isInvalid('twitter')}
          validationMessage={this.getValidationMessage('twitter')}
          onChange={this.handleFieldChanged}
        />

        <TextInputField
          label="GitHub username"
          name="github"
          value={this.getFieldValue('github')}
          isInvalid={this.isInvalid('github')}
          validationMessage={this.getValidationMessage('github')}
          onChange={this.handleFieldChanged}
        />

        <div className="modal__actions">
          <Button type="submit" appearance="primary" intent="success">Save profile updates</Button>
        </div>
      </form>
    );
  }
}

ProfileEditor.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default ProfileEditor;
