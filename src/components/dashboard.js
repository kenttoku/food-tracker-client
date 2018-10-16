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

  formatEntries(entries) {
    const formattedEntries = {
      breakfast: [],
      lunch: [],
      dinner: [],
      other: []
    };

    entries.forEach(entry => {
      formattedEntries[entry.meal].push({
        name: entry.food.name,
        id: entry._id
      });
    });

    return formattedEntries;
  }

  render() {
    const formattedEntries = this.formatEntries(this.props.entries);
    const breakfastElements = formattedEntries.breakfast.map(entry => {
      return <li key={entry.id}>{entry.name}</li>;
    });
    const lunchElements = formattedEntries.lunch.map(entry => {
      return <li key={entry.id}>{entry.name}</li>;
    });
    const dinnerElements = formattedEntries.dinner.map(entry => {
      return <li key={entry.id}>{entry.name}</li>;
    });
    const otherElements = formattedEntries.other.map(entry => {
      return <li key={entry.id}>{entry.name}</li>;
    });

    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="entries">
          <h3>Breakfast</h3>
          <ul>{breakfastElements}</ul>
          <h3>Lunch</h3>
          <ul>{lunchElements}</ul>
          <h3>Dinner</h3>
          <ul>{dinnerElements}</ul>
          <h3>Other</h3>
          <ul>{otherElements}</ul>
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
