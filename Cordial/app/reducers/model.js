import * as actions from '../consts/actions';

const initialState = {};

export default function model(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT_MODEL: {
      const {model, id, data} = action;
      const previousState = state[model] || {};
      // there should only be one "user"
      // so always repalace user models
      if (model === 'User') {
        return {
          ...state,
          User: {
            ...data
          }
        };
      }
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
    case actions.REMOVE_MODEL_FROM_STATE:
      const {model, id} = action;
      const prevState = state[model] || {};
      if (id) {
        return {
          ...state,
          [model]: {
            ...prevState,
            [id]: undefined,
          },
        };
      }
      else {
        return {
          ...state,
          [model]: undefined, // meh
        };
      }
    case actions.SAVE_TO_STORAGE: 
    case actions.LOAD_FROM_STORAGE:
    default:
      return state;
  }
}

