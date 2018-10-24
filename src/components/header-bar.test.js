import React from 'react';
import { shallow } from 'enzyme';

import HeaderBar from './header-bar';

describe('<HeaderBar />', () => {
  it('Renders without crashing', () => {
    shallow(<HeaderBar />);
  });


  it('Displays the correct header', () => {
    const title='title';
    const wrapper = shallow(<HeaderBar title={title} />);
    const header = wrapper.find('.screen-header');
    expect(header.first().text()).toBe(title);
  });
});