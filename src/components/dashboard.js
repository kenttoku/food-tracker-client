import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from './requires-login';
import {
  setDate,
  fetchDiaries,
  addNewDiary,
  setEntries
} from '../actions/diary-actions';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.date) {
      const date = new Date();
      this.props.dispatch(setDate(date));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.props.dispatch(fetchDiaries(year, month, day))
        .then(res => {
          if (!res.diaries[0]) {
            this.props.dispatch(addNewDiary(year, month, day));
          } else {
            return;
          }
        })
        .then(() => this.props.dispatch(setEntries()));
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="entries">
          <h3>Breakfast</h3>
          <h3>Lunch</h3>
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
    diaries: state.diary.diaries,
    entries: state.diary.entries,
    loading: state.diary.loading,
    error: state.diary.error,
    username: state.auth.currentUser.username
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
