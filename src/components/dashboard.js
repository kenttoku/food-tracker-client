import React from 'react';
import { connect } from 'react-redux';

import { setDate } from '../actions/diary-actions';
import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.date) {
      this.props.dispatch(setDate(new Date()));
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
  console.log(state.diary);
  return {
    date: state.diary.date,
    entries: state.diary.entries,
    loading: state.diary.loading,
    error: state.diary.error,
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
