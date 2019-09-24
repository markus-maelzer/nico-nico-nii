import React, { createContext, useReducer } from 'react';

const initialState = {
  stuck: false,
  position: null,
  sticky: false,
  stickyRadius: 50
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'stuck':
      const { position } = action;
      return { ...state, stuck: true, position };
    case 'animation':
      const { animationState } = action;
      return { ...state, animationState };
    default:
      return state;
  }
};

export const FollowCircleContext = createContext();

export const FollowCircleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FollowCircleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FollowCircleContext.Provider>
  );
};
