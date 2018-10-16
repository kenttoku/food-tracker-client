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
