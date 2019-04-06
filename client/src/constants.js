import UserAPI from './api/User';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export const API = {
  user: new UserAPI()
};
