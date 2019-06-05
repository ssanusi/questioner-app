/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validateProperty, validateSigninInput } from '../../utils/userValidator';
import { login } from '../../state/auth/action';

const SignInForm = (props) => {
  const { alert } = props;
  const [formData, setFormData] = useState({
    userData: {
      email: '',
      password: '',
    },
    errors: {},
    isValid: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = await validateSigninInput(formData.userData);
    setFormData({ ...formData, errors, isValid });
    if (Object.keys(errors).length === 0) {
      const { userData } = formData;
      props.login(userData);
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
  const { email, password } = formData.userData;
  const { errors } = formData;
  return (
    <form className="form card" onSubmit={handleSubmit}>
      <h2 className="text-center">Sign In</h2>
      <p className="text-center font-weight-bold">Sign in to view meetups</p>
      {alert.error && <div className="alert alert-danger">{alert.message}</div>}
      <div>
        <label className="label label-block" htmlFor="email">
          Email address:
        </label>
        <input
          name="email"
          type="email"
          placeholder="johndoe@domain.com"
          id="email"
          value={email}
          onChange={handleChange}
        />
        {errors.email && <div className="alert alert-danger">{errors.email}</div>}
      </div>
      <div>
        <label className="label label-block" htmlFor="password">
          Password:
        </label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
        />
        {errors.password && <div className="alert alert-danger">{errors.password}</div>}
      </div>
      <button
        name="submit"
        type="submit"
        className="btn btn-default btn-default-lg font-weight-bold"
      >
        Sign In
      </button>
      <div className="form-footer text-right">
        Don&apos;t have an account?
        <span>
          <Link to="/signup">
            <div className="btn btn-alt font-weight-bold">Sign Up</div>
          </Link>
        </span>
      </div>
    </form>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  alert: state.alert,
});

SignInForm.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    registering: PropTypes.bool.isRequired,
  }).isRequired,
  alert: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    message: PropTypes.string,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  { login },
)(SignInForm);
