import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FollowCircleContext } from '../components/follow-circle/follow-circle-store';

export class DelayLink extends React.Component {
  static propTypes = {
    delay: PropTypes.number,
    onDelayStart: PropTypes.func,
    onDelayEnd: PropTypes.func
  };

  static defaultProps = {
    delay: 0,
    onDelayStart: () => {},
    onDelayEnd: () => {}
  };
  static contextTypes = Link.contextTypes;
  timeout = null;

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  handleClick = e => {
    const { replace, to, delay, onDelayStart, onDelayEnd } = this.props;
    const { history } = this.context.router;
    // window.scrollTo({top: 1200, behavior: 'smooth'});

    onDelayStart(e, to);

    if (e.defaultPrevented) {
      return;
    }
    e.preventDefault();

    this.timeout = setTimeout(() => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }

      onDelayEnd(e, to);
    }, delay);
  };

  render() {
    const props = Object.assign({}, this.props);
    delete props.delay;
    delete props.onDelayStart;
    delete props.onDelayEnd;

    return <Link {...props} onClick={this.handleClick} />;
  }
}

export class DelayLinkPageTransition extends React.Component {
  static contextType = FollowCircleContext;
  render() {
    return (
      <DelayLink
        {...this.props}
        delay={700}
        onDelayEnd={() =>
          this.context.dispatch({ type: 'animation', animationState: '' })
        }
        onDelayStart={() =>
          this.context.dispatch({
            type: 'animation',
            animationState: 'scale'
          })
        }
      />
    );
  }
}

// how to use
// <DelayLink
//   delay={500} to='/produkte/selbstklebende-formstanzteile'>
//     <span
//       className={"active submenü " + this.state.submenü}
//       onClick={this.animate}
//     >
//       Selbstklebende Formstanzteile
//     </span>
// </DelayLink>,
