const API_URL = 'http://localhost:4000';

export const getMentors = () => {
  return fetch(`${API_URL}/mentor`).then(response => response.json());
};

export const findMentors = (query) => {
  const params = new URLSearchParams();
  params.append('text', query);
  return fetch(`${API_URL}/mentor/search?${params.toString()}`).then(response => response.json());
};