import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainWrapper from '../components/main-wrapper';

import AboutMe from '../pages/AboutMe';
import Projects from '../pages/Projects';

import { Footer, WindowLoaded } from '../components';

class Router extends Component {
  render() {
    return (
      <>
        <Route path="/" component={MainWrapper} />
        <div className="main-content">        
          <Switch>
            <Route path="/about-me" component={AboutMe} />
            <Route path="/" component={WindowLoaded(Projects, 400)} />
          </Switch>
        </div>
        <Footer />
      </>
    )
  }
}

export default Router;
