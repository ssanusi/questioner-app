import validator from "validator";
import isEmpty from "lodash.isempty";

export const SignupValidator = (req, res, next) => {
  const error = {};

  const { firstName, lastName, email, phoneNumber, username, password, confirmPassword } = req.body;
  if (!firstName) {
    error.firstName = "FirstName is Required";
  }

  if (firstName && !/^[a-zA-Z]+$/.test(firstName)) {
    error.firstName = "FirstName can only be letters";
  }

  if (!lastName) {
    error.lastName = "LastName is Required";
  }

  if (lastName && !/^[a-zA-Z]+$/.test(lastName)) {
    error.lastName = "LastName can only be letters";
  }

  //   email validation
  if (!email) {
    error.email = "Email is Required";
  }

  if (email && !validator.isEmail(email.trim())) {
    error.email = "Valid email is Required";
  }

  //   Phone no validation
  if (!phoneNumber) {
    error.phoneNumber = "Phone No is Required";
  }
  if (phoneNumber && !/^[0-9]+$/.test(phoneNumber)) {
    error.phoneNumber = "Phone No can only be number";
  }

  //   username Validation
  if (!username) {
    error.username = "username is Required";
  }
  if (username && !/^[a-zA-Z0-9]+$/.test(username)) {
    error.username = "username can only be Alphanumeric";
  }

  //   password Validation

  if (!password && !confirmPassword) {
    error.password = "Password is Required";
  }

  if (password !== confirmPassword) {
    error.password = "Password must be identical";
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
    error.email = "Email is Required";
  }

  if (email && !validator.isEmail(email.trim())) {
    error.email = "Valid email is Required";
  }

  if (isEmpty(error)) {
    return next();
  }

  return res.status(400).json({ error });
};
