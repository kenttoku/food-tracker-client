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
          <div className="navbar-link">
            <img src={homeButton} alt="home" />
            <span>Home</span>
          </div>
        </Link>
        <Link to={`/dashboard/${this.props.match.params.date}/add`}>
          <div className="navbar-link">
            <img src={addButton} alt="add" />
            <span>Add</span>
          </div>
        </Link>
        <Link to={`/dashboard/${today}/calendar`}>
          <div className="navbar-link">
            <img src={calendarButton} alt="calendar" />
            <span>Calendar</span>
          </div>
        </Link>
        <Link to={`/dashboard/${today}/settings`}>
          <div className="navbar-link">
            <img src={settingsButton} alt="settings" />
            <span>Settings</span>
          </div>
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
