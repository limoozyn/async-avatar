import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';

import {Provider} from 'react-redux';

import * as serviceWorker from './serviceWorker';
//Reducer
function asyncAvatarApp(state = { src: '' }, action) {
  switch (action.type) {
    case 'UPLOAD_AVATAR':
      return { src: action.payload };
    default:
      return state;
  }
}
//Store
let store = createStore(asyncAvatarApp);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
