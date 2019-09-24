import React, { Component } from 'react';
import { DelayLinkPageTransition } from '../../router/delay-link';

export class Nav extends Component {
  render() {
    return (
      <div>
        <DelayLinkPageTransition to="/">
          <div>Projects</div>
        </DelayLinkPageTransition>
        <DelayLinkPageTransition to="/about-me">
          <div>About Me</div>
        </DelayLinkPageTransition>
      </div>
    );
  }
}
