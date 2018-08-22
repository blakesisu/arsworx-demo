import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory';
import rootReducer from './modules/rootReducer';
import api from './middleware/api';

export const history = createHistory();

// Don't persists these parts of the state
const dbBlacklistFilter = createBlacklistFilter('db', [
  'user',
]);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['routing', 'vendor'],
  transforms: [dbBlacklistFilter]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history), api];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);
export const store = createStore(
  persistedReducer,
  initialState,
  composedEnhancers
);
export const persistor = persistStore(store);

export default {
  store,
  persistor,
  history
};
