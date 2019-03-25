const API_URL = 'http://localhost:4000';

export const getUsers = () => fetch(`${API_URL}/user`).then(response => response.json());

export const findUsers = (query) => {
  const params = new URLSearchParams();
  params.append('text', query);
  return fetch(`${API_URL}/user/search?${params.toString()}`).then(response => response.json());
};
