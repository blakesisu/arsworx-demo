import produce from 'immer';

// Action types
import { CALL_API } from 'store/middleware/api';
import {
  LOCATIONS_REQUEST,
  LOCATIONS_SUCCESS,
  LOCATIONS_ERROR
} from 'constants/actionTypes';

// Default State
// ------------------------------------------------------- //
const initialState = {
  requesting: false,
  locations: {}
};

// Reducers
// ------------------------------------------------------- //
export const locationsReducer = produce((draft, action) => {
  switch (action.type) {
    case LOCATIONS_REQUEST:
      draft.requesting = true;
      return;
    case LOCATIONS_SUCCESS:
      draft.requesting = false;
      draft.locations = action.payload;
      return;
    case LOCATIONS_ERROR:
      draft.requesting = false;
      return;
    default:
  }
}, initialState);

export default locationsReducer;

// Action Creators
// ------------------------------------------------------- //

// Side Effects
// ------------------------------------------------------- //
export const fetchLocations = () => dispatch => {
  return dispatch({
    [CALL_API]: {
      endpoint: `geo_data/geo_datas.json`,
      method: 'GET',
      types: [LOCATIONS_REQUEST, LOCATIONS_SUCCESS, LOCATIONS_ERROR],
      authenticatedRequest: false,
      isMock: true,
    }
  });
};

// Selectors
// ------------------------------------------------------- //
