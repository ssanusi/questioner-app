import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import Homepage from '../HomePage';

const appMockStore = {
  meetups: {
    upcoming: [],
    isLoading: false,
  },
  urls: [
    {
      id: 1,
      name: 'Sign In',
      link: 'signin',
    },
    {
      id: 2,
      name: 'Sign Up',
      link: 'signup',
    },
    {
      id: 3,
      name: 'Admin',
      link: 'admin',
    },
  ],
};

const mockStore = configureMockStore([thunk]);
const store = mockStore(appMockStore);

describe('Homepage tests', () => {
  test('should render page', () => {
    const homePage = render(
      <Provider store={store}>
        <Router>
          <Homepage />
        </Router>
      </Provider>,
    );
    expect(homePage).toBeTruthy();
  });
});
