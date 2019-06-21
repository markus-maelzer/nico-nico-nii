import React from 'react';
import PropTypes from 'prop-types';


export const Text = ({ children, test, className='' }) => (
  <p className={`text-main ${className}`}>
    { children }
  </p>
);

Text.propTypes = {
  children: PropTypes.string,
}
