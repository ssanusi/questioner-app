import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const validateSignupInput = (data) => {
  const errors = {};
  const {
    fullName, email, password, confirmPassword,
  } = data;
  if (!fullName) {
    errors.fullName = 'Full Name is Required';
  }

  if (fullName && !/^[a-zA-Z ]+$/.test(fullName)) {
    errors.fullName = 'FirstName can only be letters';
  }

  //   email validation
  if (!email) {
    errors.email = 'Email is Required';
  }

  if (email && !validator.isEmail(email.trim())) {
    errors.email = 'Valid email is Required';
  }

  //   password Validation

  if (!password && !confirmPassword) {
    errors.password = 'Password is Required';
  }

  if (password !== confirmPassword) {
    errors.password = 'Password must be identical';
  }
  return Object.keys(errors).length === 0
    ? { errors, isValid: true }
    : { errors, isValid: isEmpty(errors) };
};

export const validateProperty = ({ name, value }) => {
  if (name === 'fullName') {
    if (!value) {
      return 'Full Name cannot be blank';
    }
    if (!validator.isLength(value, { min: 3 })) {
      return 'Full Name must be more than 5 characters';
    }
  }

  if (name === 'email') {
    if (!value) {
      return 'Email cannot be blank';
    }

    if (!validator.isEmail(value)) {
      return 'Invalid email format';
    }
  }

  if (name === 'password') {
    if (!value) {
      return 'Password cannot be blank';
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/.test(value)) {
      return 'Password should contain at least 8 characters, a lower case character(a-z), an uppercase character(A-Z) and special characters/symbols';
    }
  }

  if (name === 'confirmPassword') {
    if (!value) {
      return 'Try password again';
    }
  }
  return null;
};

export const validateSigninInput = (data) => {
  const errors = {};
  const {
    email, password,
  } = data;
  //   email validation
  if (!email) {
    errors.email = 'Email is Required';
  }

  if (email && !validator.isEmail(email.trim())) {
    errors.email = 'Valid email is Required';
  }

  //   password Validation

  if (!password) {
    errors.password = 'Password is Required';
  }

  return Object.keys(errors).length === 0
    ? { errors, isValid: true }
    : { errors, isValid: isEmpty(errors) };
};
