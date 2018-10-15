import {
  ADD_NEW_DIARY_REQUEST,
  ADD_NEW_DIARY_SUCCESS,
  ADD_NEW_DIARY_ERROR,
  SET_DATE
} from '../actions/diary-actions';

const initialState = {
  date: null,
  entries: null,
  loading: true,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_DATE) {
    console.log('SET_DATE');
    return Object.assign({}, state, {
      date: action.date
    });
  } else if (action.type === ADD_NEW_DIARY_REQUEST) {
    console.log('ADD_NEW_DIARY_REQUEST');
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === ADD_NEW_DIARY_SUCCESS) {
    console.log('ADD_NEW_DIARY_SUCCESS');
    return Object.assign({}, state, {
      loading: false,
      error: null
    });
  } else if (action.type === ADD_NEW_DIARY_ERROR) {
    console.log('ADD_NEW_DIARY_ERROR');
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}

