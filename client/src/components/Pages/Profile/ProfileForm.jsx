import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../../../models/User';

class ProfileEditor extends Component {
  state = {
  };

  submitEdits = (e) => {
    e.preventDefault();
  }

  render() {
    const { user } = this.props;
    return (
      <form onSubmit={this.submitEdits}>
        <input type="submit" />
      </form>
    );
  }
}

ProfileEditor.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default ProfileEditor;
