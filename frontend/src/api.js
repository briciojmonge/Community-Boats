import axios from 'axios';

export const TOURS_API = 'http://localhost:8081';
export const AUTH_API = 'http://localhost:8082';
export const BOOKINGS_API = 'http://localhost:8083';
export const REVIEWS_API = 'http://localhost:8084';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  tours: axios.create({ baseURL: TOURS_API }),
  auth: axios.create({ baseURL: AUTH_API }),
  bookings: axios.create({ baseURL: BOOKINGS_API }),
  reviews: axios.create({ baseURL: REVIEWS_API }),
};