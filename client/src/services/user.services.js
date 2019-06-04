import Axios from './axios';

const register = async (user) => {
  try {
    const registeredUser = await Axios.post('/signup', user);
    return registeredUser;
  } catch (error) {
    return error;
  }
};

const signin = async (user) => {
  try {
    const userLoggedIn = await Axios.post('/login', user);
    return userLoggedIn;
  } catch (error) {
    return error;
  }
};

export const userServices = {
  register,
  signin,
};
