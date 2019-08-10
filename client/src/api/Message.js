import API from './API';

class MessageAPI extends API {
  ENDPOINT = `${this.BASE_URL}/message`;

  getAll = () => fetch(this.ENDPOINT, this.getOptions('get')).then(this.handleResponse);
}

export default MessageAPI;
