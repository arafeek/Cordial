import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';

import {User, Card} from '../models/Model';
import CounterContainer from './counter-container';
import store from './store';
import {
  Actions,
  Scene,
} from 'react-native-router-flux';
import { Router } from 'react-native-router-flux';
import routes from '../routes';

const RouterWithRedux = connect()(Router);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={routes} />
      </Provider>
    );
  }
}
