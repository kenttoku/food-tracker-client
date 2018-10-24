import React from 'react';
import { shallow } from 'enzyme';

import { Calendar } from './calendar';

describe('<Calendar />', () => {
  it('Renders without crashing', () => {
    shallow(<Calendar />);
  });
});