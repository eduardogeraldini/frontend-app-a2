import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.13:3000',
    //check your computer's IP to use, instead of localhost
});

export default api;