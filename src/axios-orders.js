import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-e4698.firebaseio.com/'
});

export default instance;
