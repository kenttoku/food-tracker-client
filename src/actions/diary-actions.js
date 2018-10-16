import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SET_DATE = 'SET_DATE';
export const setDate = yyyymmdd => ({
  type: SET_DATE,
  yyyymmdd
});

export const SET_ENTRIES = 'SET_ENTRIES';
export const setEntries = () => ({
  type: SET_ENTRIES
});

// Async Actions
export const FETCH_DIARY_REQUEST = 'FETCH_DIARY_REQUEST';
export const fetchDiaryRequest = () => ({
  type: FETCH_DIARY_REQUEST
});

export const FETCH_DIARY_SUCCESS = 'FETCH_DIARY_SUCCESS';
export const fetchDiarySuccess = diary => ({
  type: FETCH_DIARY_SUCCESS,
  diary
});

export const FETCH_DIARY_ERROR = 'FETCH_DIARY_ERROR';
export const fetchDiaryError = error => ({
  type: FETCH_DIARY_ERROR,
  error
});

export const fetchDiary = (yyyymmdd) => (dispatch, getState)  => {
  dispatch(fetchDiaryRequest());
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/diaries`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ yyyymmdd })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(diary => dispatch(fetchDiarySuccess(diary)))
    .catch(err => {
      dispatch(fetchDiaryError(err));
    });
};

export const ADD_FOOD_TO_DIARY_REQUEST = 'ADD_FOOD_TO_DIARY_REQUEST';
export const addFoodToDiaryRequest = () => ({
  type: ADD_FOOD_TO_DIARY_REQUEST
});

export const ADD_FOOD_TO_DIARY_SUCCESS = 'ADD_FOOD_TO_DIARY_SUCCESS';
export const addFoodToDiarySuccess = diary => ({
  type: ADD_FOOD_TO_DIARY_SUCCESS,
  diary
});

export const ADD_FOOD_TO_DIARY_ERROR = 'ADD_FOOD_TO_DIARY_ERROR';
export const addFoodToDiaryError = error => ({
  type: ADD_FOOD_TO_DIARY_ERROR,
  error
});

export const addFoodToDiary = (food, date) => (dispatch, getState)  => {
  dispatch(addFoodToDiaryRequest());
  const authToken = getState().auth.authToken;
  const entries = getState().diary.entries;
  const yyyymmdd = date.toString().split('-').join('');

  return fetch(`${API_BASE_URL}/diaries/${yyyymmdd}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ entries: [...entries, { food }] })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(diary => dispatch(addFoodToDiarySuccess(diary)))
    .catch(err => {
      dispatch(addFoodToDiaryError(err));
    });
};

export const DELETE_FOOD_FROM_DIARY_REQUEST = 'DELETE_FOOD_FROM_DIARY_REQUEST';
export const deleteFoodFromDiaryRequest = () => ({
  type: DELETE_FOOD_FROM_DIARY_REQUEST
});

export const DELETE_FOOD_FROM_DIARY_SUCCESS = 'DELETE_FOOD_FROM_DIARY_SUCCESS';
export const deleteFoodFromDiarySuccess = diary => ({
  type: DELETE_FOOD_FROM_DIARY_SUCCESS,
  diary
});

export const DELETE_FOOD_FROM_DIARY_ERROR = 'DELETE_FOOD_FROM_DIARY_ERROR';
export const deleteFoodFromDiaryError = error => ({
  type: DELETE_FOOD_FROM_DIARY_ERROR,
  error
});

export const deleteFoodFromDiary = (entryId) => (dispatch, getState)  => {
  dispatch(deleteFoodFromDiaryRequest());
  const authToken = getState().auth.authToken;
  const entries = getState().diary.entries.filter(entry => {
    return entry._id !== entryId;
  });
  const yyyymmdd = getState().diary.currentDiary.yyyymmdd;

  return fetch(`${API_BASE_URL}/diaries/${yyyymmdd}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ entries })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(diary => dispatch(deleteFoodFromDiarySuccess(diary)))
    .catch(err => {
      dispatch(deleteFoodFromDiaryError(err));
    });
};
