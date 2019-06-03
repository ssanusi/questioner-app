import Axios from './axios';

const register = async () => {
  try {
    const registeredUser = await Axios.get('/signup');
    return registeredUser;
  } catch (error) {
    return error;
  }
};

export const userServices = {
  register,
};
