import * as actions from '../consts/actions';

const initialState = {};

export default function model(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_MODEL: {
      const {model, id, data} = action;
      return {
        ...state,
        [model]: {
          ...state[model],
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

