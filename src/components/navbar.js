import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import requiresLogin from './requires-login';

import {
  fetchAllDiaries,
  fetchDiary,
  setEntries,
  deleteFoodFromDiary
} from '../actions/diary-actions';

class Navbar extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchDiary(this.props.date))
      .then(() => this.props.dispatch(setEntries()));
    this.props.dispatch(fetchAllDiaries())
      .then(res => console.log(res));
  }

  render() {
    return (
      <nav className="navbar">
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/add">Add Food</Link>
        <Link to="/dashboard/calendar">Calendar</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
    );
  }
}

export default requiresLogin()(connect()(Navbar));
