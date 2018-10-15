import React from 'react';
import { connect } from 'react-redux';

import { setDate, fetchDiaries } from '../actions/diary-actions';
import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.date) {
      const date = new Date();
      this.props.dispatch(setDate(date));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.props.dispatch(fetchDiaries(year, month, day));
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    date: state.diary.date,
    diaries: state.diary.diaries,
    entries: state.diary.entries,
    loading: state.diary.loading,
    error: state.diary.error,
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
