import React, { createContext, useContext } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  HashRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import App from '../client/App';
import SignIn from '../client/SignIn';
// import DogInputPage from '../client/Doggo';

describe('Testing App component', () => {
  test('App should render to screen', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass('App');
  });

  test('App should render LandingPage component', () => {
    const { container } = render(<App />);
    expect(container.firstChild.firstChild).toHaveClass('landing-page');
  });
});

describe('Testing Log In Component', () => {
  test('Should log user into account', () => {
    const signIn = jest.fn();
    // jest.mock('../client/components/Authorization.js', () => ({
    //   fakeContext: () => useContext(createContext()),
    // }));
    render(<SignIn id="signin" signIn={signIn} />, { wrapper: BrowserRouter });

    const usernameField = screen.getByLabelText(/username/i);
    const passwordField = screen.getByLabelText(/password/i);
    const signInButton = screen.getByText(/sign in/i);

    userEvent.type(usernameField, 'Chris');
    userEvent.type(passwordField, 1234);
    userEvent.click(signInButton);

    expect(signIn).toHaveBeenCalledWith({ username: 'Chris', password: 1234 });
  });
});
