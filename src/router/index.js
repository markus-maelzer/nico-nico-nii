import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainWrapper from '../components/main-wrapper';

import AboutMe from '../pages/AboutMe';
import Projects from '../pages/Projects';
import ProjectsSingle from '../pages/ProjectsSingle'

import { Footer, WindowLoaded } from '../components';

export default class MainRouter extends Component {
  componentDidMount() {
    this.handleScrollbarWiggle();
  }

  handleScrollbarWiggle = () => {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    if (!isChrome && !isSafari) {
      document.body.add('no-webkit');
    }
  }

  render() {
    return (
      <>
        <Route path="/" component={MainWrapper} />
        <div className="main-content">
          <Switch>
            <Route path="/projects/:id" component={WindowLoaded(ProjectsSingle, 400)} />            
            <Route path="/about-me" component={WindowLoaded(AboutMe, 400)} />
            <Route exact path="/" component={WindowLoaded(Projects, 400)} />
          </Switch>
        </div>
        <Footer />
      </>
    )
  }
}

 
