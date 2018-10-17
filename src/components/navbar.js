import React from 'react';
import dateFns from 'date-fns';
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
    // this.props.dispatch(fetchDiary(this.props.date))
    //   .then(() => this.props.dispatch(setEntries()));
    // this.props.dispatch(fetchAllDiaries())
    //   .then(res => console.log(res));
  }

  render() {
    return (
      <nav className="navbar">
        <Link to={`/dashboard/${this.props.date}`}>Home</Link>
        <Link to={`/dashboard/${this.props.date}/add`}>Add Food</Link>
        <Link to={`/dashboard/${this.props.date}/calendar`}>Calendar</Link>
        <Link to={`/dashboard/${this.props.date}/settings`}>Settings</Link>
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
