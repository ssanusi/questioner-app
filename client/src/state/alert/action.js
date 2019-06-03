import { SUCCESS, ERROR, CLEAR } from './actionTypes';

export const success = message => ({
  type: SUCCESS,
  message,
});

export const error = message => ({
  type: ERROR,
  message,
});

export const clear = () => ({
  type: CLEAR,
});
