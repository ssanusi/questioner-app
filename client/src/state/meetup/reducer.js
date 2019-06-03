import { initialState } from './state';
import { GET_UPCOMING_REQUEST, GET_UPCOMING_SUCCESS, GET_UPCOMING_FAILURE } from './actionTypes';

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_UPCOMING_REQUEST:
      return { ...state, isLoading: true };
    case GET_UPCOMING_SUCCESS:
      return { ...state, upcoming: action.upcoming, isLoading: false };
    case GET_UPCOMING_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};
