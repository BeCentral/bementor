import API from './API';

class UserAPI extends API {
  ENDPOINT = `${this.BASE_URL}/user`

  authenticate = () => fetch(`${this.ENDPOINT}/me`, this.getOptions('get')).then(this.handleResponse);

  logout = () => fetch(`${this.ENDPOINT}/logout`, this.getOptions('get')).then(this.handleResponse);

  get = () => fetch(this.ENDPOINT, this.getOptions('get')).then(this.handleResponse);

  getOne = id => fetch(`${this.ENDPOINT}/${id}`, this.getOptions('get')).then(this.handleResponse);

  find = (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((filter) => {
      const value = filters[filter];
      params.append(filter, Array.isArray(value) ? value.join(',') : value);
    });
    return fetch(`${this.ENDPOINT}/search?${params.toString()}`).then(this.handleResponse);
  }

  requestPasswordReset = email => fetch(`${this.ENDPOINT}/password`, this.getOptions('put', { email })).then(this.handleResponse);

  resetPassword = (password, token) => fetch(`${this.ENDPOINT}/password`, this.getOptions('put', { password, token })).then(this.handleResponse);

  confirmAccount = token => fetch(`${this.ENDPOINT}/verify`, this.getOptions('post', { token })).then(this.handleResponse);

  update = user => fetch(`${this.ENDPOINT}/${user._id}`, this.getOptions('patch', user)).then(this.handleResponse);

  register = user => fetch(`${this.ENDPOINT}/register`, this.getOptions('post', user)).then(this.handleResponse);

  login = credentials => fetch(`${this.ENDPOINT}/login`, this.getOptions('post', credentials)).then(this.handleResponse);
}

export default UserAPI;
