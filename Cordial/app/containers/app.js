import React, { Component } from 'react';
import { Provider } from 'react-redux';

import {User, Card} from '../models/Model';
import CounterContainer from './counter-container';
import store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CounterContainer />
      </Provider>
    );
  }
}
