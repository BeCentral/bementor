import API from './API';

class MessageAPI extends API {
  ENDPOINT = `${this.BASE_URL}/message`;

  get = conversationId =>
    fetch(`${this.ENDPOINT}/${messageId}`, this.getOptions('get')).then(this.handleResponse);

  all = () => fetch(this.ENDPOINT, this.getOptions('get')).then(this.handleResponse);

  message = (conversationId, message) =>
    fetch(
      `${this.ENDPOINT}/${conversationId}`,
      this.getOptions('patch', { 'message.text': message })
    ).then(this.handleResponse);

  initiate = mentor =>
    fetch(this.ENDPOINT, this.getOptions('post', { mentor })).then(this.handleResponse);

  getOneWithUser = userId => fetch(`${this.ENDPOINT}?withUser=${userId}`);
}

export default ConversationAPI;
