import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from './requires-login';
import {
  fetchDiary,
  setEntries,
  deleteFoodFromDiary
} from '../actions/diary-actions';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchDiary(this.props.date))
      .then(() => this.props.dispatch(setEntries()));
  }

  deleteEntry(entryId) {
    this.props.dispatch(deleteFoodFromDiary(entryId))
      .then(() => this.props.dispatch(setEntries()));
  }

  render() {
    const entriesElements = this.props.entries.map(entry => {
      return (<li key={entry._id}>{entry.food.name} -
        <span
          className="deleteEntryButton"
          onClick={ () => this.deleteEntry(entry._id)}
        >
          [delete]
        </span>
      </li>);
    });

    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="entries">
          <ul>{entriesElements}</ul>
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
