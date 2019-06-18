import React, { Component } from 'react';
import posed from 'react-pose';

const boxTransition = {
  type: 'tween',
  ease: 'easeIn',
  duration: 400,
}
const Box = posed.div({
  outTop: {
    top: 0,
    position: 'absolute',
    y: '-100%',
    transition: boxTransition,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: boxTransition,
  },
  outBottom: {
    top: 0,
    position: 'absolute',
    y: '100%',
    transition: boxTransition,
  }
});

export class ScrollSlider extends Component {
  state = {
    stopScroll: false,
    stopScrollAt: 0,
    activeIndex: 0,
    touchStartPos: null,
    animating: false,
  }

  componentDidMount() {
    if (window.pageYOffset <= this.state.stopScrollAt) {
      this.disableScroll();
    }
  }
  componentWillUnmount() {
    this.enableScroll();
  }

  componentWillReceiveProps() {

  }

  disableScroll = () => {
    window.addEventListener('wheel', this.handleWheel, { passive: true });
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchend', this.handleTouchEnd);
    document.body.style.overflow = 'hidden';
  }
  enableScroll = () => {
    document.body.style.overflow = 'auto';
    window.removeEventListener('wheel', this.handleWheel, { passive: true });
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }


  handleTouchStart = (e) => {
    // console.log(e);
    this.setState({
      touchStartPos: e.changedTouches[0].clientY,
    })
  }
  handleTouchEnd = (e) => {
    const { touchStartPos } = this.state;

    this.handleSlides(touchStartPos, e.changedTouches[0].clientY);
  }

  handleSlides = (factor1, factor2) => {
    const { animating } = this.state;
    if(animating) return;

    if (factor1 > factor2) {
      this.nextSlide();
    } else if(factor1 < factor2) {
      this.prevSlide();
    }
    this.setState({animating: true})
    this.animTimeout = setTimeout(() => {
      this.setState({animating: false})
    }, this.props.animTimeout);
  }

  nextSlide = () => {
    const { activeIndex } = this.state;
    const { totalSlides } = this.props

    if(activeIndex < totalSlides - 1 )
      this.setState({ activeIndex: activeIndex + 1 })
    else
      this.enableScroll();
  }
  prevSlide = () => {
    const { activeIndex } = this.state;

    if(activeIndex !== 0 )
      this.setState({ activeIndex: activeIndex - 1 })
    else if (this.state.stopScrollAt !== 0) {
      this.enableScroll();
    }
  }

  handleWheel = (e) => {
    this.handleSlides(e.deltaY, 0);
  }

  renderChildren = (e) => {
    const {activeIndex} = this.state;

    return this.props.children.map((child, i) => {
      const poseClass = activeIndex === i ? 'visible' : activeIndex > i ? 'outTop' : 'outBottom';
      return <Box key={i} pose={poseClass}>{child}</Box>;
    })
  }

  render() {
    return (
      <>
        {this.renderChildren()}
      </>
    );
  }
}


ScrollSlider.defaultProps = {
  animTimeout: 500,
  totalSlides: 2,
}
