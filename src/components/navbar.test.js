import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';

import { Navbar } from './navbar';

describe('<Navbar />', () => {
  it('Renders without crashing', () => {
    const match = { params: { date: '20181024' } };
    shallow(<Navbar match={match}/>);
  });

  it('Displays the correct link for home', () => {
    const match = { params: { date: '20181024' } };
    const today = moment().format('YYYYMMDD');
    const wrapper = shallow(<Navbar match={match}/>);
    const links = wrapper.find('Link');

    expect(links.at(0).props().to).toBe(`/dashboard/${today}`);
    expect(links.at(0).children('span').at(0).text()).toBe('Home');
  });

  it('Displays the correct link for add food', () => {
    const match = { params: { date: '20181024' } };
    const wrapper = shallow(<Navbar match={match}/>);
    const links = wrapper.find('Link');

    expect(links.at(1).props().to).toBe(`/dashboard/${match.params.date}/add`);
    expect(links.at(1).children('span').at(0).text()).toBe('Add');
  });

  it('Displays the correct link for calendar', () => {
    const match = { params: { date: '20181024' } };
    const today = moment().format('YYYYMMDD');
    const wrapper = shallow(<Navbar match={match}/>);
    const links = wrapper.find('Link');

    expect(links.at(2).props().to).toBe(`/dashboard/${today}/calendar`);
    expect(links.at(2).children('span').at(0).text()).toBe('Calendar');
  });

  it('Displays the correct link for settings', () => {
    const match = { params: { date: '20181024' } };
    const today = moment().format('YYYYMMDD');
    const wrapper = shallow(<Navbar match={match}/>);
    const links = wrapper.find('Link');
    expect(links.at(3).props().to).toBe(`/dashboard/${today}/settings`);
    expect(links.at(3).children('span').at(0).text()).toBe('Settings');
  });
});