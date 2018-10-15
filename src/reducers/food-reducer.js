import {
  FETCH_ALL_FOOD_SUCCESS,
  FETCH_ALL_FOOD_ERROR
} from '../actions/food-actions';

const initialState = {
  foodList: [],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_ALL_FOOD_SUCCESS) {
    return Object.assign({}, state, {
      foodList: action.foodList,
      error: null
    });
  } else if (action.type === FETCH_ALL_FOOD_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
