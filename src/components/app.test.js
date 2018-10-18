import React from 'react';
import { shallow } from 'enzyme';

import App from './app';

describe('<AddForm />', () => {
  it('Renders without crashing', () => {
    shallow(<App />);
  });
});