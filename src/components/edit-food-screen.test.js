import React from 'react';
import { shallow } from 'enzyme';

import { EditFoodScreen } from './edit-food-screen';

describe('<EditFoodScreen />', () => {
  it('Renders without crashing', () => {
    shallow(<EditFoodScreen />);
  });
});