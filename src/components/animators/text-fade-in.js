import React from 'react';
import SplitText from 'react-pose-text';
import PropTypes from 'prop-types';


const charPoses = {
  exit: { y: 20, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: ({ charInWordIndex, timeout }) => ({
      timeout: 1000,
      type: 'tween',
      delay: (charInWordIndex * 100) + timeout,
    })
  }
};

export const TextFadeIn = ({ visible, children, timeout=0 }) =>  (
  <SplitText
    initialPose="exit"
    pose={visible ? 'enter' : 'exit'}
    charPoses={charPoses}
    timeout={timeout}
    >{children}</SplitText>
)

TextFadeIn.propTypes = {
  children: PropTypes.string.isRequired,
}
