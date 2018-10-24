import React from 'react';
import { shallow } from 'enzyme';

import { SettingsForm } from './settings-form';

describe('<SettingsForm />', () => {
  it('Renders without crashing', () => {
    const handleSubmit = jest.fn();
    shallow(<SettingsForm handleSubmit={handleSubmit} />);
  });
});