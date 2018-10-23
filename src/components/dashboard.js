import React from 'react';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchAllDiaries, fetchDiary, deleteFoodFromDiary } from '../actions/diary-actions';
import { isValidDate } from '../actions/utils';
import deleteButton from '../assets/baseline-clear-24px.svg';
import './dashboard.css';
import './points-header.css';
import Spinner from 'react-spinkit';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (isValidDate(this.props.match.params.date)) {
      this.props.dispatch(fetchAllDiaries());
      this.props.dispatch(fetchDiary(this.props.match.params.date));
    }
  }

  deleteEntry(entryId) {
    this.props.dispatch(deleteFoodFromDiary(entryId));
  }

  render() {
    if (!isValidDate(this.props.match.params.date)) {
      return <Redirect to="/" />;
    }

    if (this.props.loading) {
      return <Spinner className="spinner" name="pacman" />;
    }

    const date = moment(this.props.match.params.date, 'YYYYMMDD').calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'MMM Do, YYYY',
      lastDay: '[Yesterday]',
      lastWeek: 'MMM Do, YYYY',
      sameElse: 'MMM Do, YYYY'
    });
    const goalPoints = this.props.currentUser.goal || 0;
    const points = (
      <header className="points-header">
        <h2 className="screen-header">Points for {date}</h2>
        <div className="points-progress">
          <div className="day-points">
            <div className="points-count">{this.props.currentDiary.points}</div>
            <p className="points-type">Current</p>
          </div>
          <div className="goal-points">
            <div className="points-count">{goalPoints}</div>
            <p className="points-type">Goal</p>
          </div>
        </div>
      </header>);

    const entriesElements = this.props.entries.map(entry => {
      return (<li key={entry._id} className="entry-list-item">
        <Link to={`/dashboard/${this.props.match.params.date}/edit/${entry._id}/`}>{entry.food.name}</Link>
        <button
          className="deleteEntryButton"
          onClick={() => this.deleteEntry(entry._id)}
        >
          <img src={deleteButton} width="16px" alt="delete" />
        </button>
      </li>);
    });

    return (
      <div className="dashboard">
        {points}
        <main className="entries">
          <ul className="entry-list">{entriesElements}</ul>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentDiary: state.diary.currentDiary,
  entries: state.diary.entries,
  currentUser: state.auth.currentUser,
  loading: state.food.loading || state.diary.loading || state.auth.loading
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
