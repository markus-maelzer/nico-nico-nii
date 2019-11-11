import React from 'react';
import SmoothScroll from './';
import './styles.css';

export default class SmoothScrollTest extends React.Component {
  state = {
    images: ['https://source.unsplash.com/random']
  };
  render() {
    return (
      <SmoothScroll>
        {this.state.images.map(image => {
          return <img alt="alt" src={image} />;
        })}
        <button
          onClick={() => {
            this.setState({
              images: [...this.state.images, 'https://source.unsplash.com/random']
            });
          }}
        >
          ADD NEW IMAGE
        </button>
      </SmoothScroll>
    );
  }
}
