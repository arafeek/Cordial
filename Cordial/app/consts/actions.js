// Action type strings
// Action strings should be of the form "<reducer_name>/<action_name>"

export const INCREMENT_COUNTER = 'Counter/INCREMENT';
export const DECREMENT_COUNTER = 'Counter/DECREMENT';

export const PUT_MODEL = 'model/PUT';
export const REGISTER_MODEL = 'model/REGISTER';
export const SAVE_TO_STORAGE_SUCCESS = 'model/SAVE_SUCCESS';
export const SAVE_TO_STORAGE_FAILURE = 'model/SAVE_FAILURE';
export const REMOVE_MODEL_FAILURE = 'model/DEVICE_REMOVE_FAILURE';
export const REMOVE_MODEL_SUCCESS = 'model/DEVICE_REMOVE_SUCCESS';
export const LOAD_FROM_STORAGE_PENDING = 'model/DEVICE_LOAD_PENDING';
export const LOAD_FROM_STORAGE_SUCCESS = 'model/DEVICE_LOAD_SUCCESS';
export const LOAD_FROM_STORAGE_FAILURE = 'model/DEVICE_LOAD_FAILURE';
export const REMOVE_MODEL_FROM_STATE = 'model/REMOVE_MODEL_FROM_STATE';

export const CREATE_CARD_PENDING = 'User/CREATE_CARD_PENDING';
export const CREATE_CARD_SUCCESS = 'User/CREATE_CARD_SUCCESS';
export const CREATE_CARD_FAILURE = 'User/CREATE_CARD_FAILURE';

export const CREATE_USER_PENDING = 'Auth/CREATE_USER_PENDING';
export const CREATE_USER_SUCCESS = 'Auth/CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'Auth/CREATE_USER_FAILURE';
export const LOGOUT_USER = 'Auth/LOGOUT';

