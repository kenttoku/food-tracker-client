import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
// Actions
import {
  fetchAllDiaries,
  fetchDiary,
  setEntries,
  deleteFoodFromDiary
} from '../actions/diary-actions';
import { isValidDate } from '../actions/utils';
import deleteButton from '../assets/baseline-delete_forever-24px.svg';
import './dashboard.css';
import PointsHeader from './points-header';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (isValidDate(this.props.match.params.date)) {
      this.props.dispatch(fetchAllDiaries());
      this.props.dispatch(fetchDiary(this.props.match.params.date))
        .then(() => this.props.dispatch(setEntries()));
    }
  }

  deleteEntry(entryId) {
    this.props.dispatch(deleteFoodFromDiary(entryId))
      .then(() => this.props.dispatch(setEntries()));
  }

  render() {
    if (!isValidDate(this.props.match.params.date)) {
      return <Redirect to="/" />;
    }
    let points = 'Loading...';
    if (this.props.currentDiary) {
      try {
        points = (
          <div className="points-header">
            <h2 className="points-header-heading">Today&apos;s Points</h2>
            <div className="points-progress">
              <div className="day-points">
                <div className="points-count">{this.props.currentDiary.points}</div>
                <p className="points-type">Current</p>
              </div>
              <div className="goal-points">
                <div className="points-count">{this.props.currentUser.goal}</div>
                <p className="points-type">Goal</p>
              </div>
            </div>
          </div>);
      } catch (e) {
        points = 'Loading...';
      }
    }
    const entriesElements = this.props.entries.map(entry => {
      return (<li key={entry._id} className="entry-list-item">
        <Link to={`/dashboard/${this.props.match.params.date}/edit/${entry._id}/`}>{entry.food.name}</Link>
        <a
          className="deleteEntryButton"
          onClick={() => this.deleteEntry(entry._id)}
        >
          <img src={deleteButton} alt="delete" />
        </a>
      </li>);
    });

    return (
      <div className="dashboard">
        {points}
        <div className="entries">
          <ul className="entry-list">{entriesElements}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentDiary: state.diary.currentDiary,
    entries: state.diary.entries,
    currentUser: state.auth.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
