import React from 'react';
import { shallow } from 'enzyme';

import { EditFoodForm } from './edit-food-form';

describe('<EditFoodForm />', () => {
  it('Renders without crashing', () => {
    const match = { params: { date: '20181024' } };
    const handleSubmit = jest.fn();
    shallow(<
      EditFoodForm
      match={match}
      handleSubmit={handleSubmit}
    />);
  });
});