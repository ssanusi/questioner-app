import { meetupConstants } from './actionTypes';
import { meetupServices } from '../../services';

export const getUpcomingRequest = () => ({ type: meetupConstants.GET_UPCOMING_REQUEST });

export const getUpcomingSuccess = upcoming => ({
  type: meetupConstants.GET_UPCOMING_SUCCESS,
  upcoming,
});

export const getUpcomingFailure = error => ({ type: meetupConstants.GET_UPCOMING_FAILURE, error });

const getUpcoming = async (dispatch) => {
  try {
    dispatch(getUpcomingRequest());
    const upcomingMeetups = await meetupServices.getUpcoming();
    dispatch(getUpcomingSuccess(upcomingMeetups));
  } catch (error) {
    dispatch(getUpcomingFailure());
  }
};

export const meetupsActions = {
  getUpcoming,
};
