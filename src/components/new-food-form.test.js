import React from 'react';
import { shallow } from 'enzyme';

import { NewFoodForm } from './new-food-form';

describe('<NewFoodForm />', () => {
  it('Renders without crashing', () => {
    const handleSubmit = jest.fn();
    shallow(<NewFoodForm handleSubmit={handleSubmit} />);
  });
});