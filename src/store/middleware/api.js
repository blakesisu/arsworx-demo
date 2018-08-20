// Originally based on these two posts
// https://www.sitepoint.com/redux-authentication-auth0/
// https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
import axios from 'axios';
import { delayPromise } from 'services/utils';
import { persistor } from 'store/store';

export const API_ROOT =
  '<PRODUCTION_ADDRESS>';
export const API_MOCK_ROOT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/data/'
    : '<STAGE_ADDRESS>/data/';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const CALL_API = Symbol('Call API');

// dev
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

async function callApi(
  endpoint,
  method,
  data,
  authenticatedRequest,
  delay,
  isMock
) {
  let token = localStorage.getItem('id_token') || null;
  let config = {};

  if (authenticatedRequest) {
    if (token) {
      config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      if (method === 'POST' || method === 'post') {
        // if multipart post is necessary
        // config.headers['Content-Type'] = 'multipart/form-data';
        // const json = JSON.stringify(data);
        // let formData = new FormData();
        // formData.append('data', json);
        // data = formData;
      }
    } else {
      throw new Error('No token saved!');
    }
  }

  if (delay) {
    await delayPromise(500);
  }

  console.log('check api endpoint', endpoint);
  return axios({
    headers,
    method,
    url: isMock ? API_MOCK_ROOT + endpoint : API_ROOT + endpoint,
    data,
    ...config
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let {
    endpoint,
    method,
    data,
    types,
    authenticatedRequest,
    delay,
    isMock
  } = callAPI;

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  if (method == null) {
    throw new Error('Specify a method (GET, POST, PUT, DELETE).');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, errorType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, method, data, authenticatedRequest, delay, isMock)
    .then(response => {
      // Set/Remove Token from local storage
      if (requestType === LOGIN_REQUEST) {
        localStorage.setItem('profile', JSON.stringify(response.profile));
        localStorage.setItem('id_token', response.token);
      }
      if (requestType === LOGOUT_REQUEST) {
        persistor.purge();
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
      }
      next(
        actionWith({
          payload: response,
          authenticatedRequest,
          type: successType
        })
      );
    })
    .catch(err => {
      let message = {
        general: 'There was an unknown error with the API'
      };

      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('status', err.response.status);
        console.log('response', err.response);
        message.general = `${err.response.status} ${err.response.statusText}`;
        message.error = err.response.data.error;
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
        message.general = 'There was an error trying to connect to the API';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
        message.general = err.message;
      }

      next(
        actionWith({
          type: errorType,
          error: message || 'Error!'
        })
      );
    });
};
