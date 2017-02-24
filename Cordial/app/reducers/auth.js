import * as actionTypes from '../consts/actions';

const initialState = {
  loading: false,
  error: null,
  me: null, // TODO: this should default to the user object if you are logged in
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.CREATE_USER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        me: action.payload,
        error: null,
      };
    case actionTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        me: null,
        error: action.payload,
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        me: null,
      };
    // TODO: write more actions
    default:
      return state;
  }
}

