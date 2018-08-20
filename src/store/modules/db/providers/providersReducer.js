import produce from 'immer';

// Action types
import { CALL_API } from 'store/middleware/api';
import {
  PROVIDERS_REQUEST,
  PROVIDERS_SUCCESS,
  PROVIDERS_ERROR
} from 'constants/actionTypes';

// Default State
// ------------------------------------------------------- //
const initialState = {
  requesting: false,
  providers: []
};

// Reducers
// ------------------------------------------------------- //
export const providersReducer = produce((draft, action) => {
  // console.log('derp', action)
  switch (action.type) {
    case PROVIDERS_REQUEST:
      draft.requesting = true;
      return;
    case PROVIDERS_SUCCESS:
      // console.log('PROVIDERS_SUCCESS', action.payload)
      draft.requesting = false;
      draft.providers = action.payload;
      return;
    case PROVIDERS_ERROR:
      draft.requesting = false;
      return;
    default:
  }
}, initialState);

export default providersReducer;

// Action Creators
// ------------------------------------------------------- //

// Side Effects
// ------------------------------------------------------- //
export const fetchProviders = () => dispatch => {
  return dispatch({
    [CALL_API]: {
      endpoint: `providers.json`,
      method: 'GET',
      types: [PROVIDERS_REQUEST, PROVIDERS_SUCCESS, PROVIDERS_ERROR],
      authenticatedRequest: false,
      isMock: true,
    }
  });
};

// Selectors
// ------------------------------------------------------- //
