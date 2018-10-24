import React from 'react';
import { shallow } from 'enzyme';

import { Navbar } from './navbar';

describe('<Navbar />', () => {
  const match = { params: { date: '20181024' } };
  it('Renders without crashing', () => {
    shallow(<Navbar match={match}/>);
  });
});