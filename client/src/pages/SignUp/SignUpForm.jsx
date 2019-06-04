/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validateSignupInput, validateProperty } from '../../utils/userValidator';
import { register } from '../../state/auth/action';

const SignUpForm = (props) => {
  // const { alert } = props;
  const [formData, setFormData] = useState({
    userData: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: {},
    isValid: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = await validateSignupInput(formData.userData);
    setFormData({ ...formData, errors, isValid });
    if (Object.keys(errors).length === 0) {
      const { userData } = formData;
      props.register(userData);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...formData.errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    const userData = { ...formData.userData };

    userData[input.name] = input.value;

    setFormData({
      ...formData,
      userData,
      errors,
    });
  };
  const {
    fullName, email, password, confirmPassword,
  } = formData.userData;
  return (
    <form className="form card" onSubmit={handleSubmit}>
      <h2 className="text-center">Sign Up</h2>
      <div id="status" className="text-center" />

      <div>
        <label className="label label-block" htmlFor="firstName">
          {' '}
          Full Name
          {' '}
        </label>
        <input
          name="fullName"
          value={fullName}
          type="text"
          placeholder="John"
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="label label-block" htmlFor="email">
          {' '}
          Email address:
          {' '}
        </label>
        <input
          name="email"
          type="email"
          value={email}
          placeholder="username@domain.com"
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="label label-block" htmlFor="password">
          {' '}
          Password:
          {' '}
        </label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="password"
        />
      </div>
      <div>
        <label className="label label-block" htmlFor="confirmPassword">
          {' '}
          Confirm Password:
          {' '}
        </label>
        <input
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="password"
        />
      </div>
      <button type="submit" className="btn btn-default btn-default-lg font-weight-bold">
        Sign Up
      </button>
      <p className="form-footer text-right">
        Already have an account?
        <span>
          <Link to="/signin">
            <div className="btn btn-alt font-weight-bold"> Log In </div>
          </Link>
        </span>
      </p>
    </form>
  );
};

SignUpForm.propTypes = {
  register: PropTypes.func.isRequired,
  //   alert: PropTypes.objectOf(PropTypes.bool).isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  alert: state.alert,
});

export default connect(
  mapStateToProps,
  { register },
)(SignUpForm);

// eslint-disable-next-line no-lone-blocks
{
  /* <form className="form card" onSubmit={handleSubmit} style={{ width: '75%' }}>
      <h2 className="text-center">Sign Up</h2>
      <div id="status" className="text-center" />
      <div className="form-group">
        <div>
          <label className="label label-block" htmlFor="firstName">
            {' '}
            First Name
            {' '}
          </label>
          <input
            name="firstName"
            value={firstName}
            type="text"
            placeholder="John"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label label-block" htmlFor="name">
            {' '}
            Last Name
            {' '}
          </label>
          <input
            name="lastName"
            value={lastName}
            type="text"
            placeholder="Doe"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <label className="label label-block" htmlFor="phone">
            {' '}
            Phone:
            {' '}
          </label>
          <input
            name="phoneNumber"
            value={phoneNumber}
            type="text"
            placeholder="08055555555"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label label-block" htmlFor="username">
            {' '}
            username:
            {' '}
          </label>
          <input
            name="username"
            value={username}
            type="text"
            placeholder="user1234"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label className="label label-block" htmlFor="email">
          {' '}
          Email address:
          {' '}
        </label>
        <input
          name="email"
          type="email"
          value={email}
          placeholder="username@domain.com"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <div>
          <label className="label label-block" htmlFor="password">
            {' '}
            Password:
            {' '}
          </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="password"
          />
        </div>
        <div>
          <label className="label label-block" htmlFor="confirmPassword">
            {' '}
            Confirm Password:
            {' '}
          </label>
          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="password"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-default btn-default-lg font-weight-bold">
        Sign Up
      </button>
      <p className="form-footer text-right">
        Already have an account?
        <span>
          <Link to="/signin">
            <div className="btn btn-alt font-weight-bold"> Log In </div>
          </Link>
        </span>
      </p>
    </form> */
}
