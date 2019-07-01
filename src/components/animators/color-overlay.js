import React from 'react';

export const ColorOverlay = ({children, visible, ref}) => (
  <div ref={ref} className={`color-overlay ${visible ? 'visible' : ''}`}>
    {children}
  </div>
)
