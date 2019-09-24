import React from 'react';
import { withRouter } from 'react-router-dom';
const ScrollRestoration = ({ children, location: { pathname } }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollRestoration);
