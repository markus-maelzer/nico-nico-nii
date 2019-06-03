import React from 'react';

export const Copyright = ({text, children}) => (
  <span>&copy; {new Date().getFullYear()} {text || children}</span>
);
