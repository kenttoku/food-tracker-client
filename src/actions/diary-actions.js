import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SET_DATE = 'SET_DATE';
export const setDate = date => ({
  type: SET_DATE,
  date
});

export const ADD_NEW_DIARY_REQUEST = 'ADD_NEW_DIARY_REQUEST';
export const addNewDiaryRequest = () => ({
  type: ADD_NEW_DIARY_REQUEST
});

export const ADD_NEW_DIARY_SUCCESS = 'ADD_NEW_DIARY_SUCCESS';
export const addNewDiarySuccess = food => ({
  type: ADD_NEW_DIARY_SUCCESS,
  food
});

export const ADD_NEW_DIARY_ERROR = 'ADD_NEW_DIARY_ERROR';
export const addNewDiaryError = error => ({
  type: ADD_NEW_DIARY_ERROR,
  error
});

export const addNewDiary = (newDiary) => (dispatch, getState) => {
  dispatch(addNewDiaryRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/diaries`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newDiary)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(food => dispatch(addNewDiarySuccess(food)))
    .catch(err => {
      dispatch(addNewDiaryError(err));
    });
};
