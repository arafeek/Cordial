// IMPORTANT: This is just meant as an example, we probably won't have a
// counter in our actual application

import * as actions from '../consts/actions';

const initialState = {
  count: 0,
};

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case actions.INCREMENT_COUNTER:
      return {
        ...state,
        count: state.count + 1.
      };
    case actions.DECREMENT_COUNTER:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

