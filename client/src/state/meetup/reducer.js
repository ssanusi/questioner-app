import { initialState } from './state';
import { meetupConstants } from './actionTypes';

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case meetupConstants.GET_UPCOMING_REQUEST:
      return { ...state, isLoading: true };
    case meetupConstants.GET_UPCOMING_SUCCESS:
      return { ...state, upcoming: action.upcoming };
    case meetupConstants.GET_UPCOMING_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
