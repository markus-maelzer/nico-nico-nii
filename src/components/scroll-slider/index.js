import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export class ScrollSlider extends Component {
  state = {
    stopScroll: false,
    stopScrollAt: 0,
    activeIndex: 0,
    totalSlides: 2,
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
    console.log(factor1);
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
    const { activeIndex, totalSlides } = this.state;

    if(activeIndex < totalSlides )
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

  render() {
    return (
      <>
      <TransitionGroup>
        {[this.props.children[this.state.activeIndex]]}        
      </TransitionGroup>
      </>
    );
  }
}


ScrollSlider.defaultProps = {
  animTimeout: 500
}
