import React from 'react';
import { shallow } from 'enzyme';

import NewFoodScreen from './new-food-screen';

describe('<NewFoodScreen />', () => {
  it('Renders without crashing', () => {
    shallow(<NewFoodScreen />);
  });
});