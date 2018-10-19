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
        points = this.props.currentDiary.points;
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
        <div className="points-today">
          Points for Today: {points}
        </div>
        <div className="entries">
          <ul className="entry-list">{entriesElements}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentDiary: state.diary.currentDiary,
    entries: state.diary.entries,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
