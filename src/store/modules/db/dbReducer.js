import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import providersReducer from './providers/providersReducer';

export default combineReducers({
  user: userReducer,
  providers: providersReducer,
});
