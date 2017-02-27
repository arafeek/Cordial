import * as actionTypes from '../consts/actions';
import * as modelActions from '../actions/model';
import {
  DEVICE_USER_ID,
  DEVICE_USER_KEY
} from '../consts/strings';

export function registerUser(name, number, email) {
  // Checks user info
  // attempts to create card
  return dispatch => {
    dispatch(createUserPending());
    setTimeout(() => {
      // TODO: this is a stub, actually need to validate user
      dispatch(createUserSuccess(name));
      let model = {
        id: email,
        email,
        phone: number,
        name,
        cards: [],
        ignoredContacts: [],
        contacts: [],
        pendingContacts: [],
      };
      dispatch(modelActions.putModel('User', email, model))
      dispatch(modelActions.saveModelToStorage(DEVICE_USER_KEY, DEVICE_USER_ID, model));
    }, 1500);
  }
}

export function logout() {
  return dispatch => {
    //TODO: uncomment this when we actually want to delete the user
    //from the device storage
    //dispatch(modelActions.removeModelFromStorage(DEVICE_USER_KEY, DEVICE_USER_ID))
    dispatch(modelActions.removeModel('User'));
    dispatch(logoutUser());
  }
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
