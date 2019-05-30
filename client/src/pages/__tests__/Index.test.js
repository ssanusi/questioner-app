import React from 'react';
import { createStore } from 'redux';
import { cleanup } from 'react-testing-library';
import Index from '../Index';
import { renderWithRedux } from '../../utils/testUtils';
import meetupReducer from '../../state/meetup/reducer';

const initialState = {
  meetups: { upcoming: [], isLoading: false },
};
const store = createStore(meetupReducer, initialState);

const setup = (props) => {
  const utils = renderWithRedux(<Index {...props} />, {
    initialState,
    store,
  });

  return {
    ...utils,
  };
};

afterEach(cleanup);

test('renders <Index /> component', () => {
  const homePage = setup(initialState);
  expect(homePage).toBeTruthy();
});
