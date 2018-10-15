import {
  ADD_NEW_DIARY_REQUEST,
  ADD_NEW_DIARY_SUCCESS,
  ADD_NEW_DIARY_ERROR,
  FETCH_DIARIES_REQUEST,
  FETCH_DIARIES_SUCCESS,
  FETCH_DIARIES_ERROR,
  SET_DATE
} from '../actions/diary-actions';

const initialState = {
  date: null,
  diaries: null,
  entries: null,
  loading: true,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_DATE) {
    return Object.assign({}, state, {
      date: action.date
    });
  } else if (action.type === ADD_NEW_DIARY_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === ADD_NEW_DIARY_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null
    });
  } else if (action.type === ADD_NEW_DIARY_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === FETCH_DIARIES_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_DIARIES_SUCCESS) {
    return Object.assign({}, state, {
      diaries: action.diaries,
      loading: false,
      error: null
    });
  }
  return state;
}

