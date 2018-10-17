import React from 'react';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
// Actions
import {
  fetchAllDiaries,
  fetchDiary,
  setEntries,
  deleteFoodFromDiary
} from '../actions/diary-actions';

export class Dashboard extends React.Component {
  componentDidMount() {
    // FIXME: Error when :date in url is invalid
    if (dateFns.parse(this.props.match.params.date) !== 'Invalid Date') {
      console.log(this.props.date);
      this.props.dispatch(fetchAllDiaries());
      this.props.dispatch(fetchDiary(this.props.date))
        .then(() => this.props.dispatch(setEntries()))
        .then(console.log('set entries'));
    }
  }

  deleteEntry(entryId) {
    this.props.dispatch(deleteFoodFromDiary(entryId))
      .then(() => this.props.dispatch(setEntries()));
  }

  render() {
    const entriesElements = this.props.entries.map(entry => {
      return (<li key={entry._id}>{entry.food.name} -
        <Link to={`/dashboard/${this.props.date}/edit/${entry._id}/`}>Edit</Link>
        <span
          className="deleteEntryButton"
          onClick={ () => this.deleteEntry(entry._id)}
        >
          [delete]
        </span>
      </li>);
    });

    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="entries">
          <ul>{entriesElements}</ul>
        </div>
      </div>
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

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
