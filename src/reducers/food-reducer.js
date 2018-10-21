import {
  FETCH_ALL_FOOD_REQUEST,
  FETCH_ALL_FOOD_SUCCESS,
  FETCH_ALL_FOOD_ERROR,
  ADD_NEW_FOOD_REQUEST,
  ADD_NEW_FOOD_SUCCESS,
  ADD_NEW_FOOD_ERROR
} from '../actions/food-actions';

const initialState = {
  foodList: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_ALL_FOOD_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_ALL_FOOD_SUCCESS) {
    return Object.assign({}, state, {
      foodList: action.foodList,
      loading: false,
      error: null
    });
  } else if (action.type === FETCH_ALL_FOOD_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === ADD_NEW_FOOD_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === ADD_NEW_FOOD_SUCCESS) {
    return Object.assign({}, state, {
      foodList: [action.food, ...state.foodList],
      loading: false,
      error: null
    });
  } else if (action.type === ADD_NEW_FOOD_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
