import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_FOOD_SUCCESS = 'FETCH_FOOD_SUCCESS';
export const fetchFoodSuccess = data => ({
  type: FETCH_FOOD_SUCCESS,
  data
});

export const FETCH_FOOD_ERROR = 'FETCH_FOOD_ERROR';
export const fetchFoodError = error => ({
  type: FETCH_FOOD_ERROR,
  error
});

export const fetchAllFood = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/food`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ data }) => dispatch(fetchFoodSuccess(data)))
    .catch(err => {
      dispatch(fetchFoodError(err));
    });
};
