// Action types
import {
  CALL_API,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from 'store/middleware/api';

// Default State
// ------------------------------------------------------- //
const initialState = {
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  requesting: false,
  error: null,
  profile: JSON.parse(localStorage.getItem('profile'))
};

// Reducers
// ------------------------------------------------------- //
export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        requesting: false,
        error: null,
        profile: action.payload.profile
      };
    case LOGIN_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error
      };
    case LOGOUT_SUCCESS:
      console.log('logout success');
      return {
        isAuthenticated: false,
        requesting: false,
        error: null,
        profile: null
      };
    default:
      return state;
  }
}

// Action Creators
// ------------------------------------------------------- //

// Side Effects
// ------------------------------------------------------- //
export const logIn = data => dispatch => {
  return dispatch({
    [CALL_API]: {
      endpoint: 'auth/login',
      method: 'POST',
      data: data.data,
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR],
      authenticatedRequest: false
      // endpoint: `user/user_${data.id}.json`,
      // method: 'GET', // This will be POST with real API
      // isMock: true,
    }
  });
};

export const logOut = data => dispatch => {
  return dispatch({
    [CALL_API]: {
      // endpoint: `user/user_1.json`,
      endpoint: `auth/logout`,
      method: 'GET', // This will be POST with real API
      types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR],
      authenticatedRequest: true
      // isMock: true
    }
  });
};

// Selectors
// ------------------------------------------------------- //
