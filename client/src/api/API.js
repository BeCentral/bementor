import { API_URL } from '../constants';

class API {
  constructor() {
    this.BASE_URL = API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }

  handleResponse = async (response) => {
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const result = await response.json();
        throw result;
      } else {
        throw response.statusText;
      }
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) return response.json();
    return response;
  }

  getOptions(method, body = null) {
    const options = {
      method: method.toUpperCase(),
      headers: this.headers,
      credentials: 'include'
    };

    if (body) options.body = JSON.stringify(body);

    return options;
  }
}

export default API;
