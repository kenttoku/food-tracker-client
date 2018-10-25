import {
  FETCH_ALL_FOOD_REQUEST,
  fetchAllFoodRequest,
  FETCH_ALL_FOOD_SUCCESS,
  fetchAllFoodSuccess,
  FETCH_ALL_FOOD_ERROR,
  fetchAllFoodError,
  ADD_NEW_FOOD_REQUEST,
  addNewFoodRequest,
  ADD_NEW_FOOD_SUCCESS,
  addNewFoodSuccess,
  ADD_NEW_FOOD_ERROR,
  addNewFoodError,
  SET_HELP,
  setHelp
} from '../actions/food-actions';

describe('fetchAllFoodRequest', () => {
  it('should return the action', () => {
    const action = fetchAllFoodRequest();
    expect(action.type).toEqual(FETCH_ALL_FOOD_REQUEST);
  });
});

describe('fetchAllFoodSuccess', () => {
  it('should return the action', () => {
    const action = fetchAllFoodSuccess();
    expect(action.type).toEqual(FETCH_ALL_FOOD_SUCCESS);
  });
});

describe('fetchAllFoodError', () => {
  it('should return the action', () => {
    const error = 'Error';
    const action = fetchAllFoodError(error);
    expect(action.type).toEqual(FETCH_ALL_FOOD_ERROR);
    expect(action.error).toEqual(error);
  });
});

describe('addNewFoodRequest', () => {
  it('should return the action', () => {
    const action = addNewFoodRequest();
    expect(action.type).toEqual(ADD_NEW_FOOD_REQUEST);
  });
});

describe('addNewFoodSuccess', () => {
  it('should return the action', () => {
    const action = addNewFoodSuccess();
    expect(action.type).toEqual(ADD_NEW_FOOD_SUCCESS);
  });
});

describe('addNewFoodError', () => {
  it('should return the action', () => {
    const error = 'Error';
    const action = addNewFoodError(error);
    expect(action.type).toEqual(ADD_NEW_FOOD_ERROR);
    expect(action.error).toEqual(error);
  });
});

describe('setHelp', () => {
  it('should return the action', () => {
    const showHelp = true;
    const action = setHelp(showHelp);
    expect(action.type).toEqual(SET_HELP);
    expect(action.showHelp).toEqual(showHelp);
  });
});