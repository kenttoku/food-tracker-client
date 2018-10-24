import React from 'react';
import { shallow } from 'enzyme';

import { Dashboard } from './dashboard';

describe('<Dashboard />', () => {
  it('Renders without crashing', () => {
    const match = { params: { date: '20181024' } };
    const currentUser = {};
    const currentDiary = {};
    const entries = [];
    const dispatch = jest.fn();
    shallow(
      <Dashboard
        match={match}
        currentUser={currentUser}
        currentDiary={currentDiary}
        entries={entries}
        dispatch={dispatch}
      />
    );
  });

  it('Renders spinner when loading', () => {
    const match = { params: { date: '20181024' } };
    const currentUser = {};
    const currentDiary = {};
    const entries = [];
    const dispatch = jest.fn();
    const wrapper = shallow(
      <Dashboard
        match={match}
        currentUser={currentUser}
        currentDiary={currentDiary}
        entries={entries}
        dispatch={dispatch}
        loading={true}
      />
    );

    const spinner = wrapper.find('Spinner');
    expect(spinner.length).toBe(1);
  });

  it('Does not render spinner when not loading', () => {
    const match = { params: { date: '20181024' } };
    const currentUser = {};
    const currentDiary = {};
    const entries = [];
    const dispatch = jest.fn();
    const wrapper = shallow(
      <Dashboard
        match={match}
        currentUser={currentUser}
        currentDiary={currentDiary}
        entries={entries}
        dispatch={dispatch}
        loading={false}
      />
    );

    const spinner = wrapper.find('Spinner');
    expect(spinner.length).toBe(0);
  });
});