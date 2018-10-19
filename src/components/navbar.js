import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import homeButton from '../assets/baseline-home-24px.svg';
import addButton from '../assets/baseline-add_circle-24px.svg';
import calendarButton from '../assets/baseline-calendar_today-24px.svg';
import settingsButton from '../assets/baseline-settings_applications-24px.svg';
import requiresLogin from './requires-login';
import { isValidDate } from '../actions/utils';

import './navbar.css';
class Navbar extends React.Component {
  render() {
    if (!isValidDate(this.props.match.params.date)) {
      return <Redirect to="/" />;
    }
    const today = moment().format('YYYYMMDD');
    return (
      <nav className="navbar">
        <Link to={`/dashboard/${today}`}>
          <img src={homeButton} alt="home" />Home
        </Link>
        <Link to={`/dashboard/${this.props.match.params.date}/add`}>
          <img src={addButton} alt="add" /> Add
        </Link>
        <Link to={`/dashboard/${today}/calendar`}>
          <img src={calendarButton} alt="calendar" /> Calendar
        </Link>
        <Link to={`/dashboard/${today}/settings`}>
          <img src={settingsButton} alt="settings" /> Settings
        </Link>
      </nav>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    entries: state.diary.entries,
    username: state.auth.currentUser.username
  };
};

export default requiresLogin()(connect(mapStateToProps)(Navbar));
