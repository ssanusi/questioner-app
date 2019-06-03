import { initialState } from './state';
import { SUCCESS, ERROR, CLEAR } from './actionTypes';

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        success: true,
        message: action.message,
      };
    case ERROR:
      return {
        ...state,
        error: true,
        message: action.message,
      };
    case CLEAR:
      return {};
    default:
      return state;
  }
};
