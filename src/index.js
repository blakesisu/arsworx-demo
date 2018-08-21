import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, history } from './store/store';
import App from './components/App';
import registerServiceWorker from './services/registerServiceWorker';

import 'leaflet/dist/leaflet.css';
// Uncomment to purge redux localstorage
// persistor.purge();

// Increment version number before updating with new code
const version = '0.1';
const cachedVersion = localStorage.getItem('version');

if (cachedVersion !== version) {
  console.log('Purging persisted data!');
  persistor.purge();
  localStorage.setItem('version', version);
  console.log(`Version ${version} has been set!`);
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
