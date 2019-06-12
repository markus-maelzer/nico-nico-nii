import React from 'react';
import PropTypes from 'prop-types';


export const Text = ({ children, test }) => (
  <p className="text-main">
    { children }
  </p>
);

Text.propTypes = {
  children: PropTypes.string,
}
