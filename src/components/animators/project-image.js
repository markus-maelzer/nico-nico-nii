import React from 'react';

export class ProjectImage extends React.Component {
  state = {
    viewPort: `0 0 ${window.innerHeight} ${window.innerWidth}`
  };

  render() {
    const { viewPort } = this.state;
    return (
      <svg
        width="100%"
        height="400"
        viewPort={`0 0 ${window.innerHeight} ${window.innerWidth}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="mask">
            <rect height="400" width="600"></rect>
          </clipPath>
        </defs>
        <g mask="url(#mask)">
          <image xlinkHref={this.props.src} width="100%" height="100%" />
        </g>
      </svg>
    );
  }
}
