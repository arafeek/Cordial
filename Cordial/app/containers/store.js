import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);
const reducer = combineReducers(reducers);

export default createStoreWithMiddleware(reducer);
