import React from 'react';

export const Title = ({ children, text, className='' }) => (
  <div className={`main-title ${className}`}>
    {text || children}
  </div>
);
