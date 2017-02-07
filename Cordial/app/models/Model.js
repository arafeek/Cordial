import {setModel} from '../actions/model';

import store from '../containers/store';
import {registerModel} from '../actions/model';

import validate, {
  userSchema,
  cardSchema
} from './schema';

const modelSelector = state => state.model;

class Model {
  constructor(model, schema) {
    this.model = model;
    this.schema = schema;
    store.subscribe(this._publish.bind(this));
    this._reference = null;
    this.subscribers = {};
    this._id = 0;
  }
  _validateSchema(json) {
    return validate(json, this.schema);
  }
  _publish(state) {
    // if the reference has changed, the model
    // has been updated
    if (this._reference !== state) {
      for (let fn in this.subscribers) {
        fn(state);
      }
    }
  }

  // PUBLIC API

  // subscribe to updates from the model.
  // Returns an id that can be used to unsubscribe
  subscribe(callback) {
    this.subscribers[this._id++] = callback;
    return this._id;
  }
  unsubscribe(id) {
    delete this.subscribers[id];
  }
  // Gets all model instances by id
  byId() {
    const state = store.getState();
    return modelSelector(state)[this.model];
  }
  // Update or create a model instance
  put(id, data) {
    const res = this._validateSchema();
    if(res !== undefined) {
      throw new Error(`${this.model}: data failed schema validation. ${data.toJSON()}`);
    } else {
      store.dispatch(setModel(this.model, id, data));
    }
  }
}

function modelCreator(name, schema) {
  const model = new Model(name, schema);
  store.dispatch(registerModel(model));
  return model;
}

export const User = modelCreator('User', userSchema);
export const Card = modelCreator('Card', cardSchema);
