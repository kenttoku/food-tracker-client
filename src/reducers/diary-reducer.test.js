import diaryReducer from './diary-reducer';
import {
  fetchDiaryRequest,
  fetchDiarySuccess,
  fetchDiaryError,
  addFoodToDiaryRequest,
  addFoodToDiarySuccess,
  addFoodToDiaryError,
  deleteFoodFromDiaryRequest,
  deleteFoodFromDiarySuccess,
  deleteFoodFromDiaryError,
  fetchAllDiariesSuccess,
  fetchAllDiariesRequest,
  fetchAllDiariesError
} from '../actions/diary-actions';

describe('diaryReducer', () => {

  it('Should set the initial state when nothin is passed in', () => {
    const state = diaryReducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual({
      diaries: [],
      currentDiary: {},
      entries: [],
      loading: false,
      error: null
    });
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = diaryReducer(currentState, { type: '__UNKNOWN' });
    expect(state).toBe(currentState);
  });


  describe('fetchDiaryRequest', () => {
    it('should set loading to true and reset error', () => {
      let currentState = {};
      const state = diaryReducer(currentState, fetchDiaryRequest());
      expect(state).toEqual({
        loading: true,
        error: null
      });
    });
  });

  describe('addFoodToDiaryRequest', () => {
    it('should set loading to true and reset error', () => {
      let currentState = {};
      const state = diaryReducer(currentState, addFoodToDiaryRequest());
      expect(state).toEqual({
        loading: true,
        error: null
      });
    });
  });

  describe('deleteFoodFromDiaryRequest', () => {
    it('should set loading to true and reset error', () => {
      let currentState = {};
      const state = diaryReducer(currentState, deleteFoodFromDiaryRequest());
      expect(state).toEqual({
        loading: true,
        error: null
      });
    });
  });

  describe('fetchAllDiariesRequest', () => {
    it('should set loading to true and reset error', () => {
      let currentState = {};
      const state = diaryReducer(currentState, fetchAllDiariesRequest());
      expect(state).toEqual({
        loading: true,
        error: null
      });
    });
  });
});