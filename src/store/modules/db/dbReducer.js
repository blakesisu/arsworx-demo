import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import providersReducer from './providers/providersReducer';
import locationsReducer from './locations/locationsReducer';

export default combineReducers({
  user: userReducer,
  providers: providersReducer,
  locations: locationsReducer,
});
