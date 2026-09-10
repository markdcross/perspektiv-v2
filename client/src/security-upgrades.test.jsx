import { beforeEach, expect, test } from 'vitest';
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';
import authReducer from './context/auth-v2/authReducer';
import { LOGIN_SUCCESS, LOGOUT } from './context/types';

beforeEach(() => { localStorage.clear(); setAuthToken(null); });

test('Axios authentication header can be set and cleared after upgrade', () => {
  setAuthToken('test-token');
  expect(axios.defaults.headers.common['x-auth-token']).toBe('test-token');
  setAuthToken(null);
  expect(axios.defaults.headers.common['x-auth-token']).toBeUndefined();
});

test('login and logout preserve token storage behavior', () => {
  const loggedIn = authReducer({}, { type: LOGIN_SUCCESS, payload: { token: 'test-token' } });
  expect(loggedIn.isAuthenticated).toBe(true);
  expect(localStorage.getItem('token')).toBe('test-token');
  const loggedOut = authReducer(loggedIn, { type: LOGOUT });
  expect(loggedOut.isAuthenticated).toBe(false);
  expect(localStorage.getItem('token')).toBeNull();
});
