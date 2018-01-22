import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

/* eslint-disable react/jsx-filename-extension */
// files with JSX should have *.jsx extension but this file - index.js
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
/* eslint-enable react/jsx-filename-extension */
registerServiceWorker();
