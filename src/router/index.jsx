import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainWrapper from '../components/main-wrapper';

import AboutMe from '../pages/AboutMe';
import Projects from '../pages/Projects';
import ProjectsSingle from '../pages/ProjectsSingle';
import SmoothScrollTest from '../components/smooth-scroll/smooth-stroll-test';

import { Footer, WindowLoaded } from '../components';
import { FollowCircle, FollowCircleProvider } from '../components/follow-circle';

export default class MainRouter extends Component {
  componentDidMount() {
    this.handleScrollbarWiggle();
  }

  handleScrollbarWiggle = () => {
    var isChrome =
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari =
      /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    if (!isChrome && !isSafari) {
      document.body.add('no-webkit');
    }
  };

  render() {
    return (
      <FollowCircleProvider>
        <FollowCircle />
        <Route path="/" component={MainWrapper} />
        <div className="main-content">
          <Switch>
            <Route
              path="/projects/:id"
              component={WindowLoaded(ProjectsSingle, 300)}
            />
            <Route path="/about-me" component={WindowLoaded(AboutMe, 300)} />
            <Route path="/test" component={WindowLoaded(SmoothScrollTest, 300)} />
            <Route exact path="/" component={WindowLoaded(Projects, 300)} />
          </Switch>
        </div>
        <Footer />
      </FollowCircleProvider>
    );
  }
}
