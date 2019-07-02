import React, { Component } from 'react';

export const WithTimeout = function (WrappedComponent, timeout = 1000) {
  return class extends Component {
    state = {
      loaded: false,
    }

    componentDidMount() {

      window.addEventListener('load', () => {
        setTimeout(() => {
          console.log('hi');
          this.setState({
            loaded: true,
          })
        }, timeout);
      })
    }

    render() {
      const { loaded } = this.state;
      if (loaded) {
        return <WrappedComponent
          loaded={loaded}
          {...this.props}
        />
      }
    }
  }
}

export const WindowLoaded = function (WrappedComponent, timeout = 0) {
  return class extends Component {
    state = {
      loaded: false,
    }

    componentDidMount() {
      console.log('mount');
      console.log(window);
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.setState({
            loaded: true,
          })
        }, timeout);
      })
    }

    render() {
      console.log(this.props);
      const { loaded } = this.state;
      return <WrappedComponent
        loaded={loaded}
        {...this.props}
      />
    }
  }
}
