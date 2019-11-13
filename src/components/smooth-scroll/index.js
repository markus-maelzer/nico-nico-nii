import React from 'react';
import posed from 'react-pose';
import { throttle } from 'lodash';

const Viewport = posed.div({
  init: {
    y: ({ scrollPos }) => {
      return scrollPos;
    },
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 500
    }
  }
});

export default class SmoothScroll extends React.Component {
  state = {
    height: window.innerHeight,
    scrollPos: 0,
    scrolling: false
  };

  ro = new ResizeObserver(elements => {
    for (let elem of elements) {
      const crx = elem.contentRect;
      this.setState({
        height: crx.height
      });
    }
  });

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.setScrollPos, 20));
    this.ro.observe(this.viewport);
  }

  setScrollPos = () => {
    this.setState({ scrollPos: -window.pageYOffset });
  };

  render() {
    return (
      <>
        <Viewport
          initialPose="none"
          pose={'init'}
          scrollPos={this.state.scrollPos}
          className="viewport"
          ref={ref => (this.viewport = ref)}
          poseKey={this.state.scrollPos}
        >
          {this.props.children}
        </Viewport>
        <div
          ref={ref => (this.fake = ref)}
          style={{
            height: this.state.height
          }}
        />
      </>
    );
  }
}
