import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_ALL_FOOD_REQUEST = 'FETCH_FOOD_REQUEST';
export const fetchAllFoodRequest = () => ({
  type: FETCH_ALL_FOOD_REQUEST
});

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
  dispatch(fetchAllFoodRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/food`, {
    method: 'GET',
    headers: {
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

export const ADD_NEW_FOOD_REQUEST = 'ADD_NEW_FOOD_REQUEST';
export const addNewFoodRequest = () => ({
  type: ADD_NEW_FOOD_REQUEST
});

export const ADD_NEW_FOOD_SUCCESS = 'ADD_NEW_FOOD_SUCCESS';
export const addNewFoodSuccess = food => ({
  type: ADD_NEW_FOOD_SUCCESS,
  food
});

export const ADD_NEW_FOOD_ERROR = 'ADD_NEW_FOOD_ERROR';
export const addNewFoodError = error => ({
  type: ADD_NEW_FOOD_ERROR,
  error
});

export const addNewFood = (newFood) => (dispatch, getState) => {
  dispatch(addNewFoodRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/food`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newFood)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(food => dispatch(addNewFoodSuccess(food)))
    .catch(err => {
      dispatch(addNewFoodError(err));
    });
};

// export const EDIT_FOOD_REQUEST = 'EDIT_FOOD_REQUEST';
// export const editFoodRequest = () => ({
//   type: EDIT_FOOD_REQUEST
// });

// export const EDIT_FOOD_SUCCESS = 'EDIT_FOOD_SUCCESS';
// export const editFoodSuccess = food => ({
//   type: EDIT_FOOD_SUCCESS,
//   food
// });

// export const EDIT_FOOD_ERROR = 'EDIT_FOOD_ERROR';
// export const editFoodError = error => ({
//   type: EDIT_FOOD_ERROR,
//   error
// });