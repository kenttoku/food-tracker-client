import {
  FETCH_DIARY_REQUEST,
  fetchDiaryRequest,
  FETCH_DIARY_SUCCESS,
  fetchDiarySuccess,
  FETCH_DIARY_ERROR,
  fetchDiaryError,
  ADD_FOOD_TO_DIARY_REQUEST,
  addFoodToDiaryRequest,
  ADD_FOOD_TO_DIARY_SUCCESS,
  addFoodToDiarySuccess,
  ADD_FOOD_TO_DIARY_ERROR,
  addFoodToDiaryError,
  DELETE_FOOD_FROM_DIARY_REQUEST,
  deleteFoodFromDiaryRequest,
  DELETE_FOOD_FROM_DIARY_SUCCESS,
  deleteFoodFromDiarySuccess,
  DELETE_FOOD_FROM_DIARY_ERROR,
  deleteFoodFromDiaryError,
  FETCH_ALL_DIARIES_SUCCESS,
  fetchAllDiariesSuccess,
  FETCH_ALL_DIARIES_REQUEST,
  fetchAllDiariesRequest,
  FETCH_ALL_DIARIES_ERROR,
  fetchAllDiariesError
} from './diary-actions';

describe('fetchDiaryRequest', () => {
  it('should return the action', () => {
    const action = fetchDiaryRequest();
    expect(action.type).toEqual(FETCH_DIARY_REQUEST);
  });
});

describe('fetchDiarySuccess', () => {
  it('should return the action', () => {
    const diary = {};
    const action = fetchDiarySuccess(diary);
    expect(action.type).toEqual(FETCH_DIARY_SUCCESS);
    expect(action.diary).toEqual(diary);
  });
});

describe('fetchDiaryError', () => {
  it('should return the action', () => {
    const error = 'Error';
    const action = fetchDiaryError(error);
    expect(action.type).toEqual(FETCH_DIARY_ERROR);
    expect(action.error).toEqual(error);
  });
});

describe('addFoodToDiaryRequest', () => {
  it('should return the action', () => {
    const action = addFoodToDiaryRequest();
    expect(action.type).toEqual(ADD_FOOD_TO_DIARY_REQUEST);
  });
});

describe('addFoodToDiarySuccess', () => {
  it('should return the action', () => {
    const diary = {};
    const action = addFoodToDiarySuccess(diary);
    expect(action.type).toEqual(ADD_FOOD_TO_DIARY_SUCCESS);
    expect(action.diary).toEqual(diary);
  });
});

describe('addFoodToDiaryError', () => {
  it('should return the action', () => {
    const error = 'Error';
    const action = addFoodToDiaryError(error);
    expect(action.type).toEqual(ADD_FOOD_TO_DIARY_ERROR);
    expect(action.error).toEqual(error);
  });
});

describe('deleteFoodFromDiaryRequest', () => {
  it('should return the action', () => {
    const action = deleteFoodFromDiaryRequest();
    expect(action.type).toEqual(DELETE_FOOD_FROM_DIARY_REQUEST);
  });
});

describe('deleteFoodFromDiarySuccess', () => {
  it('should return the action', () => {
    const diary = {};
    const action = deleteFoodFromDiarySuccess(diary);
    expect(action.type).toEqual(DELETE_FOOD_FROM_DIARY_SUCCESS);
    expect(action.diary).toEqual(diary);
  });
});

describe('deleteFoodFromDiaryError', () => {
  it('should return the action', () => {
    const error = 'Error';
    const action = deleteFoodFromDiaryError(error);
    expect(action.type).toEqual(DELETE_FOOD_FROM_DIARY_ERROR);
    expect(action.error).toEqual(error);
  });
});

describe('fetchAllDiariesRequest', () => {
  it('should return the action', () => {
    const action = fetchAllDiariesRequest();
    expect(action.type).toEqual(FETCH_ALL_DIARIES_REQUEST);
  });
});

describe('fetchAllDiariesSuccess', () => {
  it('should return the action', () => {
    const diaries = [];
    const action = fetchAllDiariesSuccess(diaries);
    expect(action.type).toEqual(FETCH_ALL_DIARIES_SUCCESS);
    expect(action.diaries).toEqual(diaries);
  });
});

describe('fetchAllDiariesError', () => {
  it('should return the action', () => {
    const error = 'Error';
    const action = fetchAllDiariesError(error);
    expect(action.type).toEqual(FETCH_ALL_DIARIES_ERROR);
    expect(action.error).toEqual(error);
  });
});
