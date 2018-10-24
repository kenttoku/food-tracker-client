import React from 'react';
import { shallow } from 'enzyme';

import { LoginForm } from './login-form';

describe('<LoginForm />', () => {
  it('Renders without crashing', () => {
    const handleSubmit = jest.fn();
    shallow(<LoginForm handleSubmit={handleSubmit} />);
  });
});