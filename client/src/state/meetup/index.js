import { initialState } from './state';
import reducer from './reducer';

export const meetup = {
  initialState,
  reducer,
  stateKey: 'meetups',
};
