import _ from 'lodash';
// Redux counter actions
import * as types from '../consts/actions';
import DeviceStorage from '../storage';
import { DEVICE_USER_KEY, DEVICE_CARD_KEY } from '../consts/strings';
import {Card} from '../models/Model';

export function putModel(model, id, data) {
  return {
    type: types.PUT_MODEL,
    model,
    id,
    data
  };
}

export function registerModel({model}) {
  return {
    type: types.REGISTER_MODEL,
    model
  };
}

export function saveModelToStorage(key, id, model) {
  return dispatch => {
    DeviceStorage.save({
      key,
      id,
      rawData: model,
    })
    .then(() => {
      dispatch(saveToStorageSuccess());
    })
    .catch((err) => {
      dispatch(saveToStorageFailure(err));
    });
  };
}

export function removeModelFromStorage(key, id) {
  return dispatch => {
    DeviceStorage.remove({
      key,
      id,
    })
    .then(() => {
      dispatch(removeModelSuccess());
    })
    .catch((err) => {
      dispatch(removeModelFailure());
    });
  };
}

export function removeModel(schemaType, id) {
  return {
    type: types.REMOVE_MODEL_FROM_STATE,
    model: schemaType,
    id,
  };
}

// Moves the model from device storage into app state
export function loadModelFromStorage(key, id) {
  return dispatch => {
    DeviceStorage.load({
      key,
      id: id,
    })
    .then((model) => {
      dispatch(loadModelSuccess());
      let modelType = key === DEVICE_USER_KEY ? 'User' : 'Card';
      dispatch(putModel(modelType, model.id, model));
      // TODO: There's better places to do this.
      // In future we could init this per collection in the model itself
      DeviceStorage.getAllDataForKey(DEVICE_CARD_KEY).then(cards => {
        _.forEach(cards, (c) => Card.put(c.id, c));
      });
    })
    .catch((err) => {
      dispatch(loadModelFailure(err));
    });
  };
}

export function removeModelFailure() {
  return {
    type: types.REMOVE_MODEL_FAILURE,
  };
}

export function removeModelSuccess() {
  return {
    type: types.REMOVE_MODEL_SUCCESS,
  };
}

export function loadModelSuccess() {
  return {
    type: types.LOAD_FROM_STORAGE_SUCCESS,
  };
}

export function loadModelFailure(error) {
  return {
    type: types.LOAD_FROM_STORAGE_FAILURE,
    error,
  };
}

export function saveToStorageSuccess() {
  return {
    type: types.SAVE_TO_STORAGE_SUCCESS,
  };
}

export function saveToStorageFailure(error) {
  return {
    type: types.SAVE_TO_STORAGE_FAILURE,
    error,
  };
}

