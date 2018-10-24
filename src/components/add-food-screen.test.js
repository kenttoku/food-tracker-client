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

  it('Renders spinner when loading', () => {
    const match = { params: { date: '20181024' } };
    const foodList = [];
    const dispatch = jest.fn();
    const wrapper = shallow(
      <AddFoodScreen
        match={match}
        foodList={foodList}
        dispatch={dispatch}
        loading={true}
      />
    );

    const spinner = wrapper.find('Spinner');
    expect(spinner.length).toBe(1);
  });

  it('Does not render spinner when not loading', () => {
    const match = { params: { date: '20181024' } };
    const foodList = [];
    const dispatch = jest.fn();
    const wrapper = shallow(
      <AddFoodScreen
        match={match}
        foodList={foodList}
        dispatch={dispatch}
        loading={false}
      />
    );

    const spinner = wrapper.find('Spinner');
    expect(spinner.length).toBe(0);
  });
});