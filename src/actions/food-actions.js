import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_ALL_FOOD_SUCCESS = 'FETCH_FOOD_SUCCESS';
export const fetchAllFoodSuccess = foodList => ({
  type: FETCH_ALL_FOOD_SUCCESS,
  foodList
});

export const FETCH_ALL_FOOD_ERROR = 'FETCH_FOOD_ERROR';
export const fetchAllFoodError = error => ({
  type: FETCH_ALL_FOOD_ERROR,
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
    .then(foodList => dispatch(fetchAllFoodSuccess(foodList)))
    .catch(err => {
      dispatch(fetchAllFoodError(err));
    });
};
