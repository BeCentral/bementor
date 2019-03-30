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

  submitEdits = (e) => {
    e.preventDefault();
    console.log('submitted');
  }

  handleFieldChanged = (e) => {
    this.setState({
      fields: {
        [e.currentTarget.name]: {
          value: e.currentTarget.value,
          validationMessage: null
        }
      }
    });
  }

  getValidationMessage = (field) => {
    const { fields } = this.state;
    if (!fields[field]) return null;
    return fields[field].validationMessage;
  }

  isInvalid = field => !!this.getValidationMessage(field);

  render() {
    const { user } = this.props;
    const { fields } = this.state;

    return (
      <form onSubmit={this.submitEdits}>
        <TextInputField
          label="First name"
          name="firstName"
          defaultValue={user.firstName}
          value={fields.firstName}
          isInvalid={this.isInvalid('firstName')}
          validationMessage={this.getValidationMessage('firstName')}
          onChange={this.handleFieldChanged}
          required
        />

        <TextInputField
          label="Last name"
          name="lastName"
          defaultValue={user.lastName}
          value={fields.lastName}
          isInvalid={this.isInvalid('lastName')}
          validationMessage={this.getValidationMessage('lastName')}
          onChange={this.handleFieldChanged}
          required
        />

        <TextInputField
          label="Tagline"
          name="tagline"
          description="A short description about yourself that will be displayed on the connect page"
          defaultValue={user.tagline}
          value={fields.tagline}
          isInvalid={this.isInvalid('tagline')}
          validationMessage={this.getValidationMessage('tagline')}
          onChange={this.handleFieldChanged}
        />

        <Pane className="modal__form-field">
          <Label className="modal__label" htmlFor="field--bio">About {user.firstName}</Label>
          <Textarea
            id="field--bio"
            name="bio"
            defaultValue={user.bio}
            value={fields.bio}
            isInvalid={this.isInvalid('bio')}
          />
        </Pane>

        <TextInputField
          label="Twitter handle"
          name="twitter"
          defaultValue={user.twitter}
          value={fields.twitter}
          isInvalid={this.isInvalid('twitter')}
          validationMessage={this.getValidationMessage('twitter')}
          onChange={this.handleFieldChanged}
        />

        <TextInputField
          label="GitHub username"
          name="github"
          defaultValue={user.github}
          value={fields.github}
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
