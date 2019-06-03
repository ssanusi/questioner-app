import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const validateSignupInput = (data) => {
  const error = {};
  const {
    firstName, lastName, email, phoneNumber, username, password, confirmPassword,
  } = data;
  if (!firstName) {
    error.firstName = 'FirstName is Required';
  }

  if (firstName && !/^[a-zA-Z]+$/.test(firstName)) {
    error.firstName = 'FirstName can only be letters';
  }

  if (!lastName) {
    error.lastName = 'LastName is Required';
  }

  if (lastName && !/^[a-zA-Z]+$/.test(lastName)) {
    error.lastName = 'LastName can only be letters';
  }

  //   email validation
  if (!email) {
    error.email = 'Email is Required';
  }

  if (email && !validator.isEmail(email.trim())) {
    error.email = 'Valid email is Required';
  }

  //   Phone no validation
  if (!phoneNumber) {
    error.phoneNumber = 'Phone No is Required';
  }
  if (phoneNumber && !/^[0-9]+$/.test(phoneNumber)) {
    error.phoneNumber = 'Phone No can only be number';
  }

  //   username Validation
  if (!username) {
    error.username = 'username is Required';
  }
  if (username && !/^[a-zA-Z0-9]+$/.test(username)) {
    error.username = 'username can only be Alphanumeric';
  }

  //   password Validation

  if (!password && !confirmPassword) {
    error.password = 'Password is Required';
  }

  if (password !== confirmPassword) {
    error.password = 'Password must be identical';
  }
  return Object.keys(error).length === 0
    ? { error, isValid: true }
    : { error, isValid: isEmpty(error) };
};

export const validateProperty = ({ name, value }) => {
  if (name === 'firstName') {
    if (!value) {
      return 'First Name cannot be blank';
    }
    if (!validator.isLength(value, { min: 3 })) {
      return 'Full Name must be more than 5 characters';
    }
  }

  if (name === 'lastName') {
    if (!value) {
      return 'Last Name cannot be blank';
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

  if (name === 'username') {
    if (!value) {
      return 'Username cannot be blank';
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return 'username can only be Alphanumeric';
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
