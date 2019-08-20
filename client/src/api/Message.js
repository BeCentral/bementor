import API from './API';

class MessageAPI extends API {
  ENDPOINT = `${this.BASE_URL}/message`;

  getAll = () => fetch(this.ENDPOINT, this.getOptions('get')).then(this.handleResponse);

  initiateWith = userId =>
    fetch(`${this.ENDPOINT}/${userId}`, this.getOptions('get')).then(this.handleResponse);

  send = (to, message) =>
    fetch(`${this.ENDPOINT}/${to}`, this.getOptions('post', { message })).then(this.handleResponse);
}

export default MessageAPI;
