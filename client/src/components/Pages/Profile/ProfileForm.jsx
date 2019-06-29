import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  Label,
  Dialog,
  Textarea,
  TextInputField,
  TagInput
} from 'evergreen-ui';
import { API } from '../../../constants';
import User from '../../../models/User';
import RequestState from '../../../models/RequestState';

class ProfileEditor extends Component {
  state = {
    fields: {},
    updateUserRequest: new RequestState()
  };

  componentDidMount() {
    const { user } = this.props;
    Object.keys(user).forEach((prop) => {
      if (prop === 'interests') return this.setFieldValue('interestNames', user.interestNames);
      return this.setFieldValue(prop, user[prop]);
    });
  }

  toMethodName = name => name.charAt(0).toUpperCase() + name.slice(1);

  cancelProfileUpdate = () => {
    const { updateUserRequest } = this.state;
    const { cancelProfileUpdate } = this.props;
    this.setState({ updateUserRequest: updateUserRequest.finish() });
    cancelProfileUpdate();
  }

  submitEdits = (closeEditor) => {
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
      if (key === 'interestNames') user.interests = fields.interestNames.value;
      else user[key] = fields[key].value;
    });

    const { updateUserRequest } = this.state;
    this.setState({ updateUserRequest: updateUserRequest.start() });
    return API.user.update(user)
      .then((updatedUser) => {
        handleUserUpdated(new User(updatedUser));
        closeEditor();
      })
      .catch((reason) => {
        // TODO show reason
        this.setState({ updateUserRequest: updateUserRequest.error(reason) });
      });
  }

  handleFieldChanged = (e) => {
    this.setFieldValue(e.currentTarget.name, e.currentTarget.value);
  }

  handleInterestsChanged = (values) => {
    this.setFieldValue('interestNames', values.map(v => v.toUpperCase()));
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
      if (field === 'interestNames') return [];
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
    const { updateUserRequest: { isLoading } } = this.state;
    const { user, isShown } = this.props;

    return (
      <Dialog
        title="Update your profile"
        confirmLabel="Save profile"
        isShown={isShown}
        onConfirm={this.submitEdits}
        isConfirmLoading={isLoading}
        onCloseComplete={this.cancelProfileUpdate}
      >
        <form onSubmit={this.submitEdits}>
          {this.renderTextField('First name', 'firstName', true)}
          {this.renderTextField('Last name', 'lastName', true)}
          {this.renderTextField('Tagline', 'tagline', false, 'A short description about yourself that will be displayed on the connect page')}
          {this.renderTextField('Location', 'location')}

          <Pane className="profile-form__field">
            <Label className="profile-form__label" htmlFor="field--bio">About {user.firstName}</Label>
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


          <Pane className="profile-form__field">
            <Label className="profile-form__label" htmlFor="field--interests">Interests</Label>
            <TagInput
              id="field--interests"
              name="interestNames"
              inputProps={{ placeholder: 'Add interests...' }}
              values={this.getFieldValue('interestNames')}
              width="100%"
              onChange={this.handleInterestsChanged}
            />
          </Pane>
        </form>
      </Dialog>
    );
  }
}

ProfileEditor.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  handleUserUpdated: PropTypes.func.isRequired,
  cancelProfileUpdate: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired
};

export default ProfileEditor;
