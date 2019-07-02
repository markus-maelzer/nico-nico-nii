import React from 'react';
import SplitText from 'react-pose-text';
import PropTypes from 'prop-types';


const charPoses = {
  exit: { y: 20, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: ({ charInWordIndex, timeout, duration=300}) => {
      // console.log(props);
      return ({
        timeout: 1000,
        type: 'tween',
        easing: 'anticipate',
        delay: (charInWordIndex * 100) + timeout,
        duration,
      })
    }
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
