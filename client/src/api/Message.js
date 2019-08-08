import API from './API';

class MessageAPI extends API {
  ENDPOINT = `${this.BASE_URL}/message`;
}

export default MessageAPI;
