import validator from 'validator';
import isEmpty from 'lodash.isempty';

export const SignupValidator = (req, res, next) => {
  const error = {};

  const {
    fullName, email, password, confirmPassword,
  } = req.body;
  if (!fullName) {
    error.fullName = 'FullName is Required';
  }

  if (fullName && !/^[a-zA-Z ]+$/.test(fullName)) {
    error.fullName = 'FullName can only be letters';
  }

  //   email validation
  if (!email) {
    error.email = 'Email is Required';
  }

  if (email && !validator.isEmail(email.trim())) {
    error.email = 'Valid email is Required';
  }
  //   password Validation

  if (!password && !confirmPassword) {
    error.password = 'Password is Required';
  }

  if (password !== confirmPassword) {
    error.password = 'Password must be identical';
  }
  if (isEmpty(error)) {
    delete req.body.confirmPassword;
    return next();
  }
  return res.status(400).json({ error });
};

export const loginValidator = (req, res, next) => {
  const error = {};
  const { email } = req.body;

  if (!email) {
    error.email = 'Email is Required';
  }

  if (email && !validator.isEmail(email.trim())) {
    error.email = 'Valid email is Required';
  }

  if (isEmpty(error)) {
    return next();
  }

  return res.status(400).json({ error });
};
