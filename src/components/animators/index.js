import { CSSTransition, Transition } from 'react-transition-group';
import React, { useState, useEffect } from 'react';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

export const Fade = ({ in: inProp, children }) => {
  const [ rendered, setRendered ] = useState(false);

  useEffect(() => {
    setRendered(true)
  })

  return (
    <Transition in={rendered} timeout={duration}>
      {state => (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          {children}
        </div>
      )}
    </Transition>
  );
}
