import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainWrapper from './components/main-wrapper';

import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';

import { Footer } from './components';

class Router extends Component {
  render() {
    return (
      <>
        <Route path="/" component={MainWrapper} />
        <Switch>
          <Route path="/about-me" component={AboutMe} />
          <Route path="/" component={Projects} />
          {/* <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <PrivateRoute path="/log/success" component={SuccessLog} />
          <PrivateRoute path="/log/error" component={ErrorLog} /> */}
        </Switch>
        <Footer />

      </>
    )
  }
}

export default Router;
