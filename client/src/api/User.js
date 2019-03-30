import API from './API';

class UserAPI extends API {
  ENDPOINT = `${this.BASE_URL}/user`

  get = () => fetch(this.ENDPOINT, this.getOptions('get')).then(this.handleResponse);

  find = (query) => {
    const params = new URLSearchParams();
    params.append('text', query);
    return fetch(`${this.ENDPOINT}/search?${params.toString()}`).then(response => response.json());
  }

  update = user => fetch(this.ENDPOINT, this.getOptions('patch', user)).then(this.handleResponse);
}

export default UserAPI;
