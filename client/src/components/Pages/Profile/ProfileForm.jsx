import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  Label,
  Textarea,
  TextInputField,
  Button,
  TagInput
} from 'evergreen-ui';
import {
  API,
  IS_LOADING,
  INACTIVE,
  HAS_ERRORED
} from '../../../constants';
import User from '../../../models/User';

class ProfileEditor extends Component {
  state = {
    fields: {},
    updateUserRequestStatus: INACTIVE,
    updateRequestError: null
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

    if (!passed) return this.setState({ fields });

    const { user, handleUserUpdated } = this.props;
    Object.keys(fields).forEach((key) => {
      user[key] = fields[key].value;
    });

    this.setState({ updateUserRequestStatus: IS_LOADING });
    return API.user.update(user)
      .then((updatedUser) => {
        this.setState({ updateUserRequestStatus: INACTIVE });
        handleUserUpdated(new User(updatedUser));
      })
      .catch((reason) => {
        // TODO show reason
        console.log(reason);
        this.setState({ updateUserRequestStatus: HAS_ERRORED });
      });
  }

  handleFieldChanged = (e) => {
    this.setFieldValue(e.currentTarget.name, e.currentTarget.value);
  }

  handleInterestsChanged = (values) => {
    this.setFieldValue('interests', values);
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
    if (!fields[field]) {
      if (field === 'interests') return [];
      return '';
    }
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

  renderTextField = (label, fieldName, isRequired = false, description = null) => (
    <TextInputField
      label={label}
      name={fieldName}
      value={this.getFieldValue(fieldName)}
      isInvalid={this.isInvalid(fieldName)}
      validationMessage={this.getValidationMessage(fieldName)}
      onChange={this.handleFieldChanged}
      required={isRequired}
      description={description}
    />
  )

  render() {
    const { updateUserRequestStatus } = this.state;
    const { user } = this.props;

    const isLoading = updateUserRequestStatus === IS_LOADING;

    return (
      <form onSubmit={this.submitEdits}>
        {this.renderTextField('First name', 'firstName', true)}
        {this.renderTextField('Last name', 'lastName', true)}
        {this.renderTextField('Tagline', 'tagline', false, 'A short description about yourself that will be displayed on the connect page')}
        {this.renderTextField('Location', 'location')}

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

        {this.renderTextField('Twitter handle', 'twitter')}
        {this.renderTextField('GitHub username', 'github')}


        <Pane className="modal__form-field">
          <Label className="modal__label" htmlFor="field--interests">Interests</Label>
          <TagInput
            id="field--interests"
            name="interests"
            inputProps={{ placeholder: 'Add interests...' }}
            values={this.getFieldValue('interests')}
            width="100%"
            onChange={this.handleInterestsChanged}
          />
        </Pane>

        <div className="modal__actions">
          <Button type="submit" appearance="primary" intent="success" isLoading={isLoading}>
            Save profile
          </Button>
        </div>
      </form>
    );
  }
}

ProfileEditor.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  handleUserUpdated: PropTypes.func.isRequired
};

export default ProfileEditor;
