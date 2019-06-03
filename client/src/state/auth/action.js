import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './actionTypes';
import { userServices } from '../../services/user.services';
import { setLocalStorage, decodeToken } from '../../libs/auth';
import { setAxiosHeader } from '../../services/axios';
import { error } from '../alert/action';

export const request = () => ({
  type: REGISTER_REQUEST,
});

export const success = user => ({
  type: REGISTER_SUCCESS,
  user,
});

export const failure = errorMessage => ({
  type: REGISTER_FAILURE,
  error: errorMessage,
});

export const register = newUser => async (dispatch) => {
  try {
    dispatch(request());
    const registeredUser = await userServices.register(newUser);
    const { token } = registeredUser.data.data;
    const decodedToken = decodeToken(token);
    dispatch(success(decodedToken));
    setLocalStorage('Qs-token', token);
    setAxiosHeader(token);
  } catch (err) {
    dispatch(failure(err));
    let { message } = err.response.data;
    if (typeof message === 'object') {
      message = Object.values(message);
    }
    dispatch(error(message));
  }
};
