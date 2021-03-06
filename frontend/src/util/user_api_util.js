import axios from './axios';

export const fetchUsers = () => {
  return axios.get('/api/users');
};

export const fetchUser = (id) => {
  return axios.get(`/api/users/${id}`);
};