// import React from 'react';
// import produce from 'immer';

export const fakeAPICall = (delay, data) => {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay, data);
  });
};

export const delayPromise = delay => {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
};
