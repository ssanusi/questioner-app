import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, children }) => <div className={className}>{children}</div>;

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
export default Button;
