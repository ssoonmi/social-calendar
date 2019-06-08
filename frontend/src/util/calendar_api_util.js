import axios from './axios';

export const createCalendar = (calendar) => {
  return axios.post('/api/calendars', calendar);
};

export const updateCalendar = (calendar, id) => {
  return axios.patch(`/api/calendars/${id}`, calendar);
};

export const fetchCalendars = () => {
  return axios.get('/api/calendars');
};

export const fetchCalendar = (id) => {
  return axios.get(`/api/calendars/${id}`);
};

export const deleteCalendar = (id) => {
  return axios.delete(`/api/calendars/${id}`);
};