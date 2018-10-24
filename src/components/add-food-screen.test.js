import React from 'react';
import { shallow } from 'enzyme';

import { AddFoodScreen } from './add-food-screen';

describe('<AddFoodScreen />', () => {
  it('Renders without crashing', () => {
    const match = { params: { date: '20181024' } };
    const foodList = [];
    const dispatch = jest.fn();
    shallow(
      <AddFoodScreen
        match={match}
        foodList={foodList}
        dispatch={dispatch}
      />
    );
  });
});