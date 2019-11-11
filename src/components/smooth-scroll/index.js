import React from 'react';
import posed from 'react-pose';

const Viewport = posed.div({
  init: {
    y: ({ scrollPos }) => {
      return scrollPos;
    },
    transition: {
      type: 'tween',
      ease: 'easeOut'
    }
  }
});

export default class SmoothScroll extends React.Component {
  state = {
    height: window.innerHeight,
    scrollPos: 0
  };

  ro = new ResizeObserver(elements => {
    for (let elem of elements) {
      const crx = elem.contentRect;
      console.log(crx);
      this.setState({
        height: crx.height
      });
    }
  });

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.ro.observe(this.viewport);
  }

  onScroll = () => {
    this.setState({ scrollPos: -window.pageYOffset });
    // TweenLite.to(this.viewport, 1, {
    //   y: -window.pageYOffset,
    //   ease: Power4.easeOut
    // });
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
