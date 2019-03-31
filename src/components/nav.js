import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <div>Projects</div>
        </Link>
        <Link to="/about-me">
          <div>About Me</div>
        </Link>
      </div>
    );
  }
}
