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
      return (<li key={entry._id}>{entry.food.name} -
        <Link to={`/dashboard/${this.props.match.params.date}/edit/${entry._id}/`}><button className="btn-black">Edit</button></Link>
        <span
          className="deleteEntryButton"
          onClick={ () => this.deleteEntry(entry._id)}
        >
          <button className="btn-red">Delete</button>
        </span>
      </li>);
    });

    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="points-today">
          Points for Today: {points}
        </div>
        <div className="entries">
          <ul>{entriesElements}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentDiary: state.diary.currentDiary,
    entries: state.diary.entries,
    username: state.auth.currentUser.username
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
