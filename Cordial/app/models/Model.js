import _ from 'lodash';
import getUUID from 'uuid-by-string';

import {putModel, removeModel} from '../actions/model';
import store from '../containers/store';
import {registerModel} from '../actions/model';
import * as modelActions from '../actions/model';
import {
  DEVICE_CARD_KEY,
  DEVICE_USER_KEY,
  DEVICE_USER_ID
} from '../consts/strings';
import validator, {
  userSchema,
  cardSchema
} from './schema';

const KEY = {
  User: DEVICE_USER_KEY,
  Card: DEVICE_CARD_KEY
};

const modelSelector = state => state.model;

class Model {
  constructor(model, schema, customSelectors) {
    this.model = model;
    this.schema = schema;
    store.subscribe(this._publish.bind(this));
    this._reference = null;
    this.subscribers = {};
    this._id = 0;

    _.forEach(customSelectors, (fn, key) => {
      this[key] = () => fn(this.byId());
    });
  }
  _validateSchema(json) {
    return validator.validate(json, this.schema);
  }
  _publish() {
    // if the reference has changed, the model
    // has been updated
    const byId = this.byId();
    if (this._reference !== byId) {
      this._reference = byId;
      _.forEach(this.subscribers, (fn) => fn(this));
    }
  }

  // PUBLIC API

  // subscribe to updates from the model.
  // Returns an id that can be used to unsubscribe
  subscribe(callback) {
    this.subscribers[++this._id] = callback;
    return this._id;
  }
  unsubscribe(id) {
    delete this.subscribers[id];
  }
  // Gets all model instances by id
  byId() {
    const state = store.getState();
    const byId = modelSelector(state)[this.model];
    return byId;
  }
  // Update or create a model instance
  put(id, data) {
    const res = this._validateSchema();
    if(!res.valid) {
      throw new Error(`${this.model}: data failed schema validation. ${res}`);
    } else {
      const localStorageKey = KEY[this.model];
      const localStorageId = this.model === 'User' ? DEVICE_USER_ID : getUUID(id);
      store.dispatch(putModel(this.model, id, data));
      store.dispatch(modelActions.saveModelToStorage(localStorageKey, localStorageId, data));
    }
  }
  delete(id){
    store.dispatch(removeModel(this.model, id));
  }
}

// customSelectors get model.byId() as input and produce some transformation.
// Don't overwrite existing model properties/methods
function modelCreator(name, schema, customSelectors) {
  const model = new Model(name, schema, customSelectors);
  store.dispatch(registerModel(model));
  return model;
}

const userSelectors = {
  me: (byId) => {
    const res = _.sample(byId); // TODO: This assumes local storage will only ever have your own profile
    return res;
  }
};

export const User = modelCreator('User', userSchema, userSelectors);


const cardSelectors = {
  myCards: (byId) => {
    const me = User.me().id;
    console.log('asfdadf', User.me());
    console.log('byID ', byId);
    return _.filter(byId, card => card.user === me && (_.indexOf(User.me().cards, card.id) > -1));
  },
  myContacts: (byId) => {
    const contacts = (User.me() || {}).contacts;
    return _.map(contacts, id => byId[id]);
  },
  pendingContacts: (byId) => {
    const pending = User.me().pendingContacts;
    return  _.map(pending, id => byId[id]);
  },
  ignoredContacts: (byId) => {
    const ignored = User.me().ignoredContacts;
    return  _.map(ignored, id => byId[id]);
  },
};

export const Card = modelCreator('Card', cardSchema, cardSelectors);
