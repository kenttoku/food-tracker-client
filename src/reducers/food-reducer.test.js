import foodReducer from './food-reducer';
import {
  fetchAllFoodRequest,
  fetchAllFoodSuccess,
  fetchAllFoodError,
  addNewFoodRequest,
  addNewFoodSuccess,
  addNewFoodError,
  setHelp
} from '../actions/food-actions';

describe('foodReducer', () => {
  it('Should set the initial state when nothin is passed in', () => {
    const state = foodReducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual({
      foodList: [],
      loading: false,
      error: null,
      showHelp: false
    });
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = foodReducer(currentState, { type: '__UNKNOWN' });
    expect(state).toBe(currentState);
  });

  describe('fetchAllFoodRequest', () => {
    it('should set loading to true and reset error', () => {
      let currentState = {};
      const state = foodReducer(currentState, fetchAllFoodRequest());
      expect(state).toEqual({
        loading: true,
        error: null
      });
    });
  });

  describe('addNewFoodRequest', () => {
    it('should set loading to true and reset error', () => {
      let currentState = {};
      const state = foodReducer(currentState, addNewFoodRequest());
      expect(state).toEqual({
        loading: true,
        error: null
      });
    });
  });
});
