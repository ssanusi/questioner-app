import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './actionTypes';
import { setLocalStorage, decodeToken } from '../../libs/auth';
import Axios, { setAxiosHeader } from '../../services/axios';
import { errorAction } from '../alert/action';

// import { error } from '../alert/action';

export const RegisterRequest = () => ({
  type: REGISTER_REQUEST,
});

export const RegisterSuccess = user => ({
  type: REGISTER_SUCCESS,
  user,
});

export const RegisterFailure = error => ({
  type: REGISTER_FAILURE,
  error,
});

export const LoginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const LoginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

export const LoginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});
export const register = user => async (dispatch) => {
  try {
    dispatch(RegisterRequest());
    const registeredUser = await Axios.post('/auth/signup', user);
    const { token } = registeredUser.data.data[0];
    const decodedToken = decodeToken(token);
    dispatch(RegisterSuccess(decodedToken));
    setLocalStorage('Qs-token', token);
    setAxiosHeader(token);
  } catch (error) {
    dispatch(RegisterFailure(error.response.data));
    const { error: errorMessage } = error.response.data.error;
    dispatch(errorAction(errorMessage));
  }
};

export const login = user => async (dispatch) => {
  try {
    dispatch(LoginRequest());
    const userLoggedIn = await Axios.post('/auth/login', user);
    const { token } = userLoggedIn.data.data[0];
    const decodedToken = decodeToken(token);
    dispatch(LoginSuccess(decodedToken));
    setLocalStorage('Qs-token', token);
    setAxiosHeader(token);
  } catch (error) {
    dispatch(LoginFailure(error.response));
    const { error: errorMessage } = error.response.data;
    dispatch(errorAction(errorMessage));
  }
};
