import { GET_UPCOMING_REQUEST, GET_UPCOMING_SUCCESS, GET_UPCOMING_FAILURE } from './actionTypes';
import { meetupServices } from '../../services';

export const getUpcomingRequest = () => ({ type: GET_UPCOMING_REQUEST });

export const getUpcomingSuccess = upcoming => ({
  type: GET_UPCOMING_SUCCESS,
  upcoming,
});

export const getUpcomingFailure = error => ({ type: GET_UPCOMING_FAILURE, error });

export const getUpcoming = () => async (dispatch) => {
  try {
    dispatch(getUpcomingRequest());
    const upcomingMeetups = await meetupServices.getUpcoming();
    dispatch(getUpcomingSuccess(upcomingMeetups.data.data));
  } catch (error) {
    dispatch(getUpcomingFailure());
  }
};

export const meetupsActions = {
  getUpcoming,
};
