import axios from 'axios';

export const API_URL = `${window.location.origin}`;


export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});
