import validator from "validator";
import isEmpty from "lodash.isempty";

const userValidator = (req, res, next) => {
  const error = {};
  const { firstName, lastName, email, phoneNumber, username, password, confirmPassword } = req.body;
  if (!firstName) {
    error.firstName = "FirstName is Required";
  }

  if (firstName && validator.isEmpty(firstName.trim())) {
    error.firstName = "FirstName cannot be empty";
  }

  if (!lastName) {
    error.lastName = "LastName is Required ";
  }

  if (lastName && validator.isEmpty(lastName.trim())) {
    error.lastName = "LastName cannot be empty";
  }

//   email validation
  if (!email) {
    error.email = "Email is Required";
  }

  if (email && validator.isEmpty(email.trim())) {
    error.email = "Email cannot be empty";
  }
  if (email && !validator.isEmail(email.trim())) {
    error.email = "Valid email is Required";
  }

//   Phone no validation

  if (!phoneNumber) {
    error.phoneNumber = "Phone No is Required";
  }

  if (phoneNumber && validator.isEmpty(phoneNumber.trim())) {
    error.phoneNumber = "Phone Number cannot be empty";
  }

//   username Validation

  if (!username) {
    error.username = "username is Required";
  }

  if (username && validator.isEmpty(username.trim())) {
    error.username = "Username cannot be empty";
  }

//   password Validation

  if (!password) {
    error.password = "Password is Required";
  }

  if (password && validator.isEmpty(password.trim())) {
    error.password = "Password cannot be empty";
  }

  if (!confirmPassword) {
    error.confirmPassword = "ConfirmPassword is Required";
  }

  if (confirmPassword && validator.isEmpty(confirmPassword.trim())) {
    error.confirmPassword = "ConfirmPassword cannot be empty";
  }

  if (password !== confirmPassword) {
    error.password = "Password must be identical ";
  }
  if (isEmpty(error)) {
    delete req.body.confirmPassword;
    return next();
  }
  return res.status(400).json({ error });
};

export default userValidator;
