// Redux counter actions
import * as types from '../consts/actions';

export function increment() {
  return {
    type: types.INCREMENT_COUNTER,
  };
}

export function decrement() {
  return {
    type: types.DECREMENT_COUNTER,
  };
}

