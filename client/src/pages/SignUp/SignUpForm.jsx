/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validateSignupInput, validateProperty } from '../../utils/userValidator';
import { register } from '../../state/auth/action';

const SignUpForm = (props) => {
  const { auth, alert } = props;
  const [formData, setFormData] = useState({
    userData: {
      fullName: '',
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
  const { errors } = formData;
  return (
    <form className="form card" onSubmit={handleSubmit}>
      <h2 className="text-center">Sign Up</h2>
      <div id="status" className="text-center" />
      {alert.error && <div className="alert alert-danger">{Object.values(auth.error.error)}</div>}
      <div>
        <label className="label label-block" htmlFor="fullName">
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
          error={errors.fullName}
        />
        {errors.fullName && <div className="alert alert-danger">{errors.fullName}</div>}
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
          error={errors.email}
        />
        {errors.email && <div className="alert alert-danger">{errors.email}</div>}
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
          error={errors.password}
        />
        {errors.password && <div className="alert alert-danger">{errors.password}</div>}
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
          error={errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <div className="alert alert-danger">{errors.confirmPassword}</div>
        )}
      </div>
      <button type="submit" className="btn btn-default btn-default-lg font-weight-bold">
        Sign Up
      </button>
      <div className="form-footer text-right">
        Already have an account?
        <span>
          <Link to="/signin">
            <div className="btn btn-alt font-weight-bold"> Log In </div>
          </Link>
        </span>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    registering: PropTypes.bool.isRequired,
  }).isRequired,
  alert: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    message: PropTypes.string,
  }).isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  alert: state.alert,
});

export default connect(
  mapStateToProps,
  { register },
)(SignUpForm);
