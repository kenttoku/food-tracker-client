import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from './requires-login';
import {
  fetchDiary,
  setEntries
} from '../actions/diary-actions';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchDiary(this.props.date))
      .then(() => this.props.dispatch(setEntries()));
  }

  render() {
    const formattedEntries = {
      breakfast: [],
      lunch: [],
      dinner: [],
      other: []
    };

    this.props.entries.forEach(entry => {
      console.log(entry);
      formattedEntries[entry.meal].push({
        name: entry.food.name,
        id: entry._id
      });
    });

    const breakfastElements = formattedEntries.breakfast.map(entry => {
      return <li key={entry.id}>{entry.name}</li>;
    });

    const lunchElements = formattedEntries.lunch.map(entry => {
      console.log(entry);
      return <li key={entry.id}>{entry.name}</li>;
    });

    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="entries">
          <h3>Breakfast</h3>
          <h3>Lunch</h3>
          <ul>{lunchElements}</ul>
          <h3>Dinner</h3>
          <h3>Other</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: state.diary.date,
    currentDiary: state.diary.currentDiary,
    diaries: state.diary.diaries,
    entries: state.diary.entries,
    loading: state.diary.loading,
    error: state.diary.error,
    username: state.auth.currentUser.username
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
