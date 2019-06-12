import React from 'react';

export const Title = ({ children, text }) => (
  <div className="main-title">
    {text || children}
  </div>
);
