import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInputField } from 'evergreen-ui';
import User from '../../../models/User';

class ProfileEditor extends Component {
  state = {
    fields: {}
  };

  submitEdits = (e) => {
    e.preventDefault();
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
    if (!fields[field]) return '';
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
          isInvalid={!!this.isInvalid('firstName')}
          validationMessage={!!this.getValidationMessage('firstName')}
          onChange={this.handleFieldChanged}
          required
        />
        <input type="submit" />
      </form>
    );
  }
}

ProfileEditor.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default ProfileEditor;
