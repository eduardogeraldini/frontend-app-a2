import axios from 'axios';

const api = axios.create({
  baseURL: 'http://consultai.herokuapp.com/',
    //check your computer's IP to use, instead of localhost
});

export default api;