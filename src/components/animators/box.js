import posed from 'react-pose';

const boxTransition = {
  type: 'tween',
  ease: 'easeIn',
  duration: 300,
}
export const Box = posed.div({
  outTop: {
    top: 0,
    position: 'absolute',
    opacity: 0,
    y: '-100%',
    transition: boxTransition,
    flip: true,
  },
  visible: {
    top: 0,
    opacity: 1,
    y: 0,
    position: 'relative',
    transition: boxTransition,
  },
  outBottom: {
    top: 0,
    left: 0,
    opacity: 0,
    position: 'absolute',
    y: '100%',
    transition: boxTransition,
  },
});
