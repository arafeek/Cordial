import * as actionTypes from '../consts/actions';
import { User } from '../models/Model';
import { putModel } from '../actions/model';

export function registerUser(name, number, email) {
  // Checks user info
  // attempts to create card
  return dispatch => {
    dispatch(createUserPending());
    setTimeout(() => {
      // TODO: this is a stub, actually need to validate user
      dispatch(createUserSuccess(name));
      dispatch(putModel('User', email, {
        id: email,
        email,
        phone: number,
        name,
        cards: [],
        ignoredContacts: [],
        contacts: [],
        pendingContacts: [],
      }))
    }, 1500);
  }
}

export function createUserPending() {
  return {
    type: actionTypes.CREATE_USER_PENDING
  };
}

export function createUserSuccess(user) {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    payload: user,
  };
}

export function createUserFailure() {
  return {
    type: actionTypes.CREATE_USER_FAILURE,
  }
}
