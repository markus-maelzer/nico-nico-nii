import React from 'react';
import posed from 'react-pose';

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99]
};

const OverflowContainer = posed.div({
  init: {
    position: 'relative',
    transition,
    flip: true,
    overflow: 'hidden'
  },
  zoom: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    transition,
    flip: true
  }
});

export class ProjectImage extends React.Component {
  state = {
    viewPort: `0 0 ${window.innerHeight} ${window.innerWidth}`,
    paddingTop: null,
    animated: false
  };

  componentDidMount() {
    const test = new Image();
    test.addEventListener('load', () => {
      const { height, width } = test;
      console.log('asd');
      this.setState({
        paddingTop: (height * 100) / width
      });
    });
    test.src = this.props.src;
  }

  extendImage = () => {
    console.log('test');

    this.setState({
      animated: true
    });
  };

  render() {
    if (!this.state.paddingTop) return null;
    const { viewPort, paddingTop, animated } = this.state;
    const pose = animated ? 'zoom' : 'init';
    console.log(animated);

    return (
      // <OverflowContainer
      //   pose={pose}
      //   className="project__image-container"
      //   style={{
      //     backgroundImage: `url(${this.props.src})`
      //   }}
      //   onClick={this.extendImage}
      // >
      //   {/* <div
      //     className="project__image"
      //     style={{
      //       backgroundImage: `url(${this.props.src})`
      //     }}
      //   ></div> */}
      // </OverflowContainer>
      <div
        className="overlay image-test"
        style={{ backgroundImage: `url(${this.props.src})` }}
      />
      // <svg
      //   width="100%"
      //   height="400"
      //   viewPort={`0 0 ${window.innerHeight} ${window.innerWidth}`}
      //   xmlns="http://www.w3.org/2000/svg"
      // >
      //   <defs>
      //     <clipPath id="mask">
      //       <rect height="400" width="600"></rect>
      //     </clipPath>
      //   </defs>
      //   <g mask="url(#mask)">
      //     <image xlinkHref={this.props.src} width="100%" height="100%" />
      //   </g>
      // </svg>
    );
  }
}
