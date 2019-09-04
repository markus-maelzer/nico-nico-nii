import React, { Component } from 'react';

export const WithTimeout = function (WrappedComponent, timeout = 1000) {
  return class extends Component {
    state = {
      loaded: false,
    }

    componentDidMount() {
      window.addEventListener('load', () => {
        setTimeout(() => {
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
      if(document.readyState === 'complete') {
        return this.timeout();
      }
      window.addEventListener('load', this.timeout)
    }

    componentWillUnmount() {
      window.removeEventListener('load', this.timeout)
    }

    timeout = () => {
      setTimeout(() => {
        this.setState({
          loaded: true,
        })
      }, timeout);
    }

    unload = () => {
      console.log('test');
      this.setState({loaded: false});
    } 

    render() {
      const { loaded } = this.state;
      return <WrappedComponent
        loaded={loaded}
        unload={this.unload}
        {...this.props}
      />
    }
  }
}
