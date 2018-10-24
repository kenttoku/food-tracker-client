import React from 'react';
import { shallow } from 'enzyme';

import { Calendar } from './calendar';

describe('<Calendar />', () => {
  it('Renders without crashing', () => {
    const match = { params: { date: '20181024' } };
    const diaries = [];
    const dispatch = jest.fn();
    shallow(
      <Calendar
        match={match}
        diaries={diaries}
        dispatch={dispatch}
      />
    );
  });
});