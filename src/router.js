import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';



class Router extends Component {
  render() {
    return (
      <>
        {/* <Route path="/" component={MainWrapper} /> */}
        <Switch>
          {/* <Route path="/storyboard" component={Storyboard} />
          <Route path="/" component={Dashboard} /> */}
          {/* <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <PrivateRoute path="/log/success" component={SuccessLog} />
          <PrivateRoute path="/log/error" component={ErrorLog} /> */}
        </Switch>
      </>
    )
  }
}

export default Router;
