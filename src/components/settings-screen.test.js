import React from 'react';
import { shallow } from 'enzyme';

import { SettingsScreen } from './settings-screen';

describe('<SettingsScreen />', () => {
  it('Renders without crashing', () => {
    shallow(<SettingsScreen />);
  });
});