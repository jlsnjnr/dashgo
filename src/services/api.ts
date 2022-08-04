import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://dashgo-ashy.vercel.app/api/users'
  baseURL: 'http://localhost:3000/api'
})