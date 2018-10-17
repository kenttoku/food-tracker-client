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
  SET_DATE,
  SET_ENTRIES,
  FETCH_ALL_DIARIES_SUCCESS,
  FETCH_ALL_DIARIES_REQUEST,
  FETCH_ALL_DIARIES_ERROR
} from '../actions/diary-actions';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const yyyymmddd = year * 10000 + month * 100 + day;

const initialState = {
  date: yyyymmddd,
  diaries: [],
  currentDiary: null,
  entries: [],
  loading: true,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_DATE) {
    return Object.assign({}, state, {
      date: action.date
    });
  } else if (action.type === SET_ENTRIES) {

    return Object.assign({}, state, {
      entries: state.currentDiary.entries
    });
  } else if (action.type === FETCH_DIARY_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_DIARY_SUCCESS) {
    console.log(action.diary);
    return Object.assign({}, state, {
      currentDiary: action.diary,
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
    console.log(action.diary);
    return Object.assign({}, state, {
      currentDiary: action.diary,
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
    console.log(action.diary);
    return Object.assign({}, state, {
      currentDiary: action.diary,
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

