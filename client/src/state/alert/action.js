import { SUCCESS, ERROR, CLEAR } from './actionTypes';

export const successAction = message => ({
  type: SUCCESS,
  message,
});

export const errorAction = message => ({
  type: ERROR,
  message,
});

export const clearClear = () => ({
  type: CLEAR,
});
