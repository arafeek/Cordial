import _ from 'lodash';
import {
  Actions as RouteActions,
  ActionConst as RouteActionConst
} from 'react-native-router-flux';
import * as actionTypes from '../consts/actions';
import * as modelActions from '../actions/model';
import {
  DEVICE_USER_ID,
  DEVICE_USER_KEY
} from '../consts/strings';
import {User, Card} from '../models/Model';
import {cards} from '../consts/dummy-data';

export function registerUser(name, number, email) {
  // Checks user info
  // attempts to create card
  return dispatch => {
    dispatch(createUserPending());
    setTimeout(() => {
      // TODO: this is a stub, actually need to validate user
      dispatch(createUserSuccess(name));

      const randomID = Math.floor(Math.random() * 1000000);
      const cardId = email + '@' + randomID; // TODO: Literally anything but this

      const user = {
        id: email,
        email,
        phone: number,
        name,
        cards: [cardId],
        ignoredContacts: [],
        contacts: _.map(cards, 'id'),
        pendingContacts: [],
      };

      const card = {
        displayName: name,
        user: email,
        id: cardId,
        type: 'Card 1',
        profilePhoto: null,
        displayPhoto: null,
        fields: [
          {
            custom: false,
            value: number,
            displayName: 'Phone',
            icon: 'phone-square'
          },
          {
            custom: false,
            value: email,
            displayName: 'Email',
            icon: 'envelope-square'
          }
        ]
      };

      User.put(email, user);
      Card.put(cardId, card);
    }, 1500);
  };
}

export function createCard(name, number, email) {
  // attempts to create card
  return dispatch => {
    dispatch(createUserPending());
    setTimeout(() => {
      const randomID = Math.floor(Math.random() * 1000000);
      const cardId = email + '@' + randomID; // TODO: Literally anything but this

      const card = {
        displayName: name,
        user: email,
        id: cardId,
        type: 'Card ' + (Card.myCards().length + 1),
        profilePhoto: null,
        displayPhoto: null,
        style: {
          header: {
            startColor: '#ffffff',
            endColor: '#888888'
          },
          body: {
            startColor: '#beef1e',
            endColor: '#ffffff'
          }
        },
        fields: [
          {
            custom: false,
            value: number,
            displayName: 'Phone',
            icon: 'phone-square'
          },
          {
            custom: false,
            value: email,
            displayName: 'Email',
            icon: 'envelope-square'
          }
        ]
      };

      const u = User.me();
      Card.put(cardId, card);
      User.put(u.id, {...u, cards: [...u.cards, cardId]});
    }, 1500);
  };
}

export function deleteCard(cardId) {
  // attempts to delete a card
  return dispatch => {
    dispatch(createUserPending());
    setTimeout(() => {
      Card.delete(cardId);
    }, 1500);
  };
}

export function logout() {
  return dispatch => {
    //TODO: uncomment this when we actually want to delete the user
    //from the device storage
    dispatch(modelActions.removeModelFromStorage(DEVICE_USER_KEY, DEVICE_USER_ID));
    dispatch(modelActions.removeModel('User'));
    dispatch(logoutUser());
    RouteActions.welcome({type: RouteActionConst.RESET});
  };
}

function logoutUser() {
  return {
    type: actionTypes.LOGOUT_USER,
  };
}

function createUserPending() {
  return {
    type: actionTypes.CREATE_USER_PENDING
  };
}

function createUserSuccess(user) {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    payload: user,
  };
}

function createUserFailure() {
  return {
    type: actionTypes.CREATE_USER_FAILURE,
  }
}
