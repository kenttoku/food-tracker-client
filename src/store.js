import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth-reducer';
import diaryReducer from './reducers/diary-reducer';
import foodReducer from './reducers/food-reducer';
import { setAuthToken, refreshAuthToken } from './actions/auth-actions';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    diary: diaryReducer,
    food: foodReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
