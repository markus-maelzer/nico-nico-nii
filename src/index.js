import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.min.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import { rootReducer as reducer } from './redux';
import MainRouter from './router';
import ScrollRestoration from './router/scroll-restoration';

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const composeReduxMiddlewares = () => {
  if (process.env.NODE_ENV === 'development') {
    return compose(
      applyMiddleware(reduxThunk)
      // reduxDevTools
    );
  } else {
    return compose(applyMiddleware(reduxThunk));
  }
};

const store = createStore(reducer, composeReduxMiddlewares());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollRestoration>
        <MainRouter />
      </ScrollRestoration>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
