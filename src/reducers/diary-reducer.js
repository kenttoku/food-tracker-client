import {
  FETCH_DIARY_REQUEST,
  FETCH_DIARY_SUCCESS,
  FETCH_DIARY_ERROR,
  ADD_FOOD_TO_DIARY_REQUEST,
  ADD_FOOD_TO_DIARY_SUCCESS,
  ADD_FOOD_TO_DIARY_ERROR,
  DELETE_FOOD_FROM_DIARY_REQUEST,
  DELETE_FOOD_FROM_DIARY_SUCCESS,
  DELETE_FOOD_FROM_DIARY_ERROR,
  FETCH_ALL_DIARIES_SUCCESS,
  FETCH_ALL_DIARIES_REQUEST,
  FETCH_ALL_DIARIES_ERROR
} from '../actions/diary-actions';

const initialState = {
  diaries: [],
  currentDiary: {},
  entries: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_DIARY_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_DIARY_SUCCESS) {
    return Object.assign({}, state, {
      currentDiary: action.diary,
      entries: action.diary.entries,
      loading: false,
      error: null
    });
  } else if (action.type === FETCH_DIARY_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === ADD_FOOD_TO_DIARY_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === ADD_FOOD_TO_DIARY_SUCCESS) {
    return Object.assign({}, state, {
      currentDiary: action.diary,
      entries: action.diary.entries,
      loading: false,
      error: null
    });
  } else if (action.type === ADD_FOOD_TO_DIARY_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === DELETE_FOOD_FROM_DIARY_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === DELETE_FOOD_FROM_DIARY_SUCCESS) {
    return Object.assign({}, state, {
      currentDiary: action.diary,
      entries: action.diary.entries,
      loading: false,
      error: null
    });
  } else if (action.type === DELETE_FOOD_FROM_DIARY_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === FETCH_ALL_DIARIES_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_ALL_DIARIES_SUCCESS) {
    return Object.assign({}, state, {
      diaries: action.diaries,
      loading: false,
      error: null
    });
  } else if (action.type === FETCH_ALL_DIARIES_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}

