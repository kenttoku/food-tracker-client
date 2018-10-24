import React from 'react';
import { shallow } from 'enzyme';

import { AddFoodScreen } from './add-food-screen';

describe('<AddFoodScreen />', () => {
  it('Renders without crashing', () => {
    shallow(<AddFoodScreen />);
  });
});