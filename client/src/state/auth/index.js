import { initialState } from './state';
import authReducer from './reducer';

export const auth = {
  initialState,
  authReducer,
  stateKey: 'auth',
};
