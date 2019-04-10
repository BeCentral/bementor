import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { API } from '../../../constants';

const ConfirmAccount = ({ history, match }) => {
  const { token } = match.params;

  if (!token) return history.push('/');

  // TODO show success
  API.user.confirmAccount(token).then(() => history.push('/'));

  return (
    <p />
  );
};

ConfirmAccount.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired
};

export default withRouter(ConfirmAccount);
