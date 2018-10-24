import React from 'react';
import { shallow } from 'enzyme';

import Input from './input';

describe('<Input />', () => {
  it('Renders without crashing', () => {
    const meta = {};
    const input = {};
    shallow(<
      Input
      meta={meta}
      input={input}
    />);
  });
});