import React from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import homeButton from '../assets/baseline-home-24px.svg';
import addButton from '../assets/baseline-add_circle-24px.svg';
import calendarButton from '../assets/baseline-calendar_today-24px.svg';
import settingsButton from '../assets/baseline-settings_applications-24px.svg';
import requiresLogin from './requires-login';
import { isValidDate } from '../actions/utils';

class Navbar extends React.Component {
  render() {
    if (!isValidDate(this.props.date)) {
      return <Redirect to="/" />;
    }
    const today = dateFns.format(new Date(), 'YYYYMMDD');

    return (
      <nav className="navbar">
        <Link to={`/dashboard/${today}`}>
          <img src={homeButton} alt="home" />Home
        </Link>
        <Link to={`/dashboard/${this.props.date}/add`}>
          <img src={addButton} alt="add" /> Add
        </Link>
        <Link to={`/dashboard/${this.props.date}/calendar`}>
          <img src={calendarButton} alt="calendar" /> Calendar
        </Link>
        <Link to={`/dashboard/${this.props.date}/settings`}>
          <img src={settingsButton} alt="settings" /> Settings
        </Link>
      </nav>
    );
  }
}

const mapStateToProps = (state, props) => {
  let date = dateFns.format(new Date(), 'YYYYMMDD');
  if (props.match.params.date) {
    date = props.match.params.date;
  }
  return {
    date,
    entries: state.diary.entries,
    username: state.auth.currentUser.username
  };
};

export default requiresLogin()(connect(mapStateToProps)(Navbar));
