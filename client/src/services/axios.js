import axios from 'axios';
import { USER_TOKEN } from '../libs/localStorage';

const Axios = axios.create({
  baseURL: 'https://questioner-app-api.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAxiosHeader = (token) => {
  Axios.defaults.headers.common.Authorization = token;
};
Axios.defaults.headers.common.Authorization = USER_TOKEN;

export default Axios;
