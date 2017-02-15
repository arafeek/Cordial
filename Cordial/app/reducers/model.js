import * as actions from '../consts/actions';

const initialState = {};

export default function model(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT_MODEL: {
      const {model, id, data} = action;
      const previousState = state[model] || {};
      return {
        ...state,
        [model]: {
          ...previousState,
          [id]: data
        }
      };
    }
    case actions.REGISTER_MODEL: {
      const {model} = action;
      return {
        ...state,
        [model]: {}
      };
    }
    default:
      return state;
  }
}

