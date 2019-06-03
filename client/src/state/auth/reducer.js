import { initialState } from './state';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,

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
    default:
      return state;
  }
};
