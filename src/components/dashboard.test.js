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
});