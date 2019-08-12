import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export class DelayLink extends React.Component {
  static propTypes = {
    delay:        PropTypes.number,
    onDelayStart: PropTypes.func,
    onDelayEnd:   PropTypes.func,
  };

  static defaultProps = {
    delay:        0,
    onDelayStart: () => {},
    onDelayEnd:   () => {}
  };
  static contextTypes = Link.contextTypes;
  timeout = null;

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  handleClick = (e) => {
    const { replace, to, delay, onDelayStart, onDelayEnd } = this.props;
    const { history } = this.context.router;
    // window.scrollTo({top: 1200, behavior: 'smooth'});
    console.log(onDelayStart);
    
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

    return (
      <Link {...props} onClick={this.handleClick} />
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
