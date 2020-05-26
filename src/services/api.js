import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
    //check your computer's IP to use, instead of localhost
});

export default api;