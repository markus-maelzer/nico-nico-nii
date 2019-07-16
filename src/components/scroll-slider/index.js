import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: ScrollSlider fix scroll handler when height of body is not enoght to scroll
// +  add always lock scroll
// +  detHeight on resize

// + add earlier scrollability
//   -> wenn letzter slide animiert wird
//   -> already unlock scroll

// + wheel and touch events need to be always active

// + handle Resize >_>_>_>_>_>_>

export class ScrollSlider extends Component {
  state = {
    stopScroll: false,
    activeIndex: 0,
    touchStartPos: null,
    animating: false,
    init: true,
    height: 'auto',
  }
  test = [];

  componentDidMount() {
    // BUG: window.pageYOffset is 0 if page didnt load yet ._. i think its fixed
    if(document.readyState === 'complete') {
      return this.init();
    }
    window.addEventListener('load', this.init);
  }

  init = () => {
    if (window.pageYOffset <= this.props.stopScrollAt) {
      this.disableScroll();
    } else {
      this.setState({
        activeIndex: this.props.totalSlides - 1,
      })
    }
    window.addEventListener('scroll', this.handleScroll);
    this.detHeight();
  }

  componentWillUnmount() {
    this.enableScroll();
    window.removeEventListener('scroll', this.handleScroll);
  }

  disableScroll = () => {
    window.addEventListener('wheel', this.handleWheel, { passive: true });
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchend', this.handleTouchEnd);
    document.body.classList.add('noscroll');
  }
  enableScroll = () => {
    document.body.classList.remove('noscroll');
    window.removeEventListener('wheel', this.handleWheel, { passive: true });
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }

  handleScroll = () => {
    if(window.pageYOffset <= this.props.stopScrollAt) {
      this.disableScroll();
      this.handleWheel({deltaY: -100})
    }
  }

  handleTouchStart = (e) => {
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
  }

  handleAnimating = (callback=() => {}) => {
    this.setState({animating: true})
    this.animTimeout = setTimeout(() => {
      this.setState({animating: false}, callback)
    }, this.props.animTimeout);
  }

  nextSlide = () => {
    const { activeIndex } = this.state;
    const { totalSlides } = this.props
    console.log(activeIndex, totalSlides - 1);
    if(activeIndex < totalSlides - 2 ) {
      this.setState({ activeIndex: activeIndex + 1 })
    } else if(activeIndex <= totalSlides - 2) {
      this.setState({ activeIndex: activeIndex + 1 })
      return this.handleAnimating(this.enableScroll);
    } else {
      this.enableScroll();
    }

    this.handleAnimating();
  }

  prevSlide = () => {
    const { activeIndex } = this.state;

    if(activeIndex !== 0 )
      this.setState({ activeIndex: activeIndex - 1 })
    else if (this.props.stopScrollAt !== 0) {
      this.enableScroll();
    }
    this.handleAnimating();
  }

  handleWheel = ({ deltaY }) => {
    this.handleSlides(deltaY, 0);
  }

  setRef = (indicator) => (el) => {
    this.test[indicator] = el;
  }


  detHeight = () => {
    if(this.test.length === 0) return 'auto';
    // console.log(this.test[0].clientHeight);
    const height = this.test.reduce((acc, cur) => {
      return  acc < cur.clientHeight ? cur.clientHeight : acc;
    }, 0);

    this.setState({
      height,
      init: false,
    })
  }
  poseClass = (activeIndex, i) => {
    const actual = activeIndex === i ? 'visible' : activeIndex > i ? 'outTop' : 'outBottom';
    if(this.state.init) {
      return 'visible';
    } else {
      return actual;
    }
  }

  render() {
    const { height } = this.state;
    const { setRef, state, poseClass } = this
    return (
      <div className={`scrolltainer noscroll ${this.props.className}`} style={{ height }}>
        {this.props.children({setRef, poseClass}, state)}
      </div>
    );
  }
}


ScrollSlider.defaultProps = {
  animTimeout: 300,
  totalSlides: 2,
  stopScrollAt: 0,
}

ScrollSlider.propTypes = {
  children: PropTypes.func.isRequired,
}
