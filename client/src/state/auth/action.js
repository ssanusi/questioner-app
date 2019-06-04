import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './actionTypes';
import { userServices } from '../../services/user.services';
import { setLocalStorage, decodeToken } from '../../libs/auth';
import { setAxiosHeader } from '../../services/axios';
import { error } from '../alert/action';

export const RegisterRequest = () => ({
  type: REGISTER_REQUEST,
});

export const RegisterSuccess = user => ({
  type: REGISTER_SUCCESS,
  user,
});

export const RegisterFailure = errorMessage => ({
  type: REGISTER_FAILURE,
  error: errorMessage,
});

export const LoginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const LoginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

export const LoginFailure = errorMessage => ({
  type: LOGIN_FAILURE,
  error: errorMessage,
});
export const register = user => async (dispatch) => {
  try {
    dispatch(RegisterRequest());
    const registeredUser = await userServices.register(user);
    console.log('thunk', registeredUser);
    const { token } = registeredUser.data.data;
    const decodedToken = decodeToken(token);
    dispatch(RegisterSuccess(decodedToken));
    setLocalStorage('Qs-token', token);
    setAxiosHeader(token);
  } catch (err) {
    dispatch(RegisterFailure(err));
    dispatch(error(err));
  }
};

export const login = user => async (dispatch) => {
  try {
    dispatch(LoginRequest());
    const userLoggedIn = await userServices.signin(user);
    const { token } = userLoggedIn.data.data;
    const decodedToken = decodeToken(token);
    dispatch(LoginSuccess(decodedToken));
    setLocalStorage('Qs-token', token);
    setAxiosHeader(token);
  } catch (err) {
    dispatch(LoginFailure(err));
    const { message } = error.response.data;
    dispatch(error(message));
  }
};
