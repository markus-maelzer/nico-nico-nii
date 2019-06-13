import React, { Component } from 'react';

export class ScrollSlider extends Component {
  state = {
    stopScroll: false,
    stopScrollAt: 0,
    activeIndex: 0,
    totalSlides: 2,
    touchStartPos: null,
  }

  componentDidMount() {
    window.addEventListener('wheel', this.handleWheel, { passive: true });
    if (window.pageYOffset <= this.state.stopScrollAt) {
      this.disableScroll();
    }

    // window.addEventListener('touchstart', this.handleWheel);
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchend', this.handleTouchEnd);
  }
  disableScroll = () => {
    document.body.style.overflow = 'hidden';
  }
  enableScroll = () => {
    document.body.style.overflow = 'auto';
  }

  handleTouchStart = (e) => {
    // console.log(e);
    this.setState({
      touchStartPos: e.changedTouches[0].clientY,
    })
  }
  handleTouchEnd = (e) => {
    const { touchStartPos } = this.state;
    console.log(touchStartPos < e.changedTouches[0].clientY);
    if (touchStartPos < e.changedTouches[0].clientY) {
      this.nextSlide()
    } else if(touchStartPos > e.changedTouches[0].clientY) {
      this.prevSlide()
    }
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

    if(activeIndex !== 0 && this.state.stopScrollAt !== 0 )
      this.setState({ activeIndex: activeIndex - 1 })
    else
      this.enableScroll();
  }

  handleWheel = (e) => {
    console.log(e.type);
    console.log(e);
  }

  render() {
    console.log(this.state.activeIndex);
    return (
      <>
        {this.props.children}
      </>
    );
  }
}
