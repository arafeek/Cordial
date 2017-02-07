// Redux counter actions
import * as types from '../consts/actions';

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

