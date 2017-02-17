import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  Actions,
  Scene,
} from 'react-native-router-flux';
import { Router } from 'react-native-router-flux';

import routes from '../routes';
import {User, Card} from '../models/Model';
import CounterContainer from './counter-container';
import store from './store';

// ** Let's hydrate the store with some dummy data for now **
import {cards, JohnDoeProfile} from '../consts/dummy-data.js';
import {putModel} from '../actions/model';

cards.forEach(c => store.dispatch(putModel('Card', c.id, c)));

store.dispatch(putModel('User', JohnDoeProfile.id, JohnDoeProfile));

// **********************************************************


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
