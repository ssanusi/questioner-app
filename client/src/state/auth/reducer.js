import { initialState } from './state';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './actionTypes';

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, registering: true };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        registered: true,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        registered: false,
        error: action.error,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: true,
        loggedIn: true,
        current_user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        loggedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
