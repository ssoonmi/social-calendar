import axios from './axios';

export const login = (user) => {
  return axios.post('/api/users/login', user);
};

export const signup = (user) => {
  return axios.post('/api/users/register', user);
};