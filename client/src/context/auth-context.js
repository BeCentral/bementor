import React from 'react';

export default React.createContext({
  user: null,
  setAuthenticatedUser: () => {},
  requestState: null
});
