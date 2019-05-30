import Axios from './axios';

const getUpcoming = async () => {
  try {
    const upcomingMeetups = await Axios.get('/meetups/upcoming');
    return upcomingMeetups;
  } catch (error) {
    return error;
  }
};

export const meetupServices = {
  getUpcoming,
};
