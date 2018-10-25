import authReducer from './auth-reducer';
import {
  setAuthToken,
  clearAuth,
  authRequest,
  authSuccess,
  authError
} from '../actions/auth-actions';

describe('authReducer', () => {
  it('Should set the initial state when nothin is passed in', () => {
    const state = authReducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual({
      authToken: null,
      currentUser: null,
      loading: false,
      error: null
    });
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = authReducer(currentState, { type: '__UNKNOWN' });
    expect(state).toBe(currentState);
  });

  describe('authRequest', () => {
    it('should set loading to true and reset error', () => {
      let currentState = {};
      const state = authReducer(currentState, authRequest());
      expect(state).toEqual({
        loading: true,
        error: null
      });
    });
  });
});