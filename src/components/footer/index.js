import React, { Component } from 'react';

import { Copyright } from './copyright';

export class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container-big row justify-space-between">
          <Copyright>
            Nicolas Cetl
          </Copyright>
          <div>
            <a href="#behance">behance.</a>
            <a href="#instagram">instagram.</a>
          </div>
        </div>
      </footer>
    );
  }
}
