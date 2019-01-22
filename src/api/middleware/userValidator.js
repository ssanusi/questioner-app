import validator from "validator";
import isEmpty from "lodash.isempty";

const userValidator = (req, res, next) => {
  const error = {};
  const { firstName, lastName, email, phoneNumber, username, password, confirmPassword } = req.body;
  if (!firstName) {
    error.firstName = "FirstName is Required";
  }

  if (!lastName) {
    error.lastName = "LastName is Required";
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

  //   username Validation

  if (!username) {
    error.username = "username is Required";
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

export default userValidator;
