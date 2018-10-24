import React from 'react';
import { shallow } from 'enzyme';

import { EditFoodScreen } from './edit-food-screen';

describe('<EditFoodScreen />', () => {
  it('Renders without crashing', () => {
    const match = { params: { date: '20181024' } };
    const dispatch = jest.fn();
    shallow(
      <EditFoodScreen
        match={match}
        dispatch={dispatch}
      />
    );
  });

  it('Renders spinner when loading', () => {
    const match = { params: { date: '20181024' } };
    const dispatch = jest.fn();
    const wrapper = shallow(
      <EditFoodScreen
        match={match}
        dispatch={dispatch}
        loading={true}
      />
    );

    const spinner = wrapper.find('Spinner');
    expect(spinner.length).toBe(1);
  });

  it('Does not render spinner when not loading', () => {
    const match = { params: { date: '20181024' } };
    const dispatch = jest.fn();
    const wrapper = shallow(
      <EditFoodScreen
        match={match}
        dispatch={dispatch}
        loading={false}
      />
    );

    const spinner = wrapper.find('Spinner');
    expect(spinner.length).toBe(0);
  });
});