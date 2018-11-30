import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ className, text }) => (
  <div className={`alert ${className}`} role="alert">
    {text}
  </div>
);

Alert.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Alert;
