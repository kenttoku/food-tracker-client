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
});