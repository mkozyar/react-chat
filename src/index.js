/* eslint-disable */
import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Start from './start';
import reducer from './reducers';




const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());




ReactDOM.render(
  <Provider store={store}>
    
     <Start />
 
  </Provider>,
  document.getElementById('root')
);