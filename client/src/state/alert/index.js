import { initialState } from './state';
import alertReducer from './reducer';

export const alert = {
  initialState,
  alertReducer,
  stateKey: 'alert',
};
