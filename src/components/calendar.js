import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  fetchAllDiaries,
  fetchDiary,
  setEntries
} from '../actions/diary-actions';

import chevronLeft from '../assets/baseline-chevron_left-24px.svg';
import chevronRight from '../assets/baseline-chevron_right-24px.svg';
import './calendar.css';
import PointsHeader from './points-header';

class Calendar extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllDiaries());
    this.props.dispatch(fetchDiary(this.props.match.params.date))
      .then(() => this.props.dispatch(setEntries()));
  }

  renderHeader() {
    const calHeader = moment(this.props.match.params.date, 'YYYYMMDD')
      .format('MMM YYYY');
    return (
      <div className="calendar-header row flex-middle">
        <div className="col col-start" onClick={() => this.prevMonth()}>
          <img className="calendar-icon-left" src={chevronLeft} alt="previous month" />
        </div>
        <div className="col col-center">
          <span>{calHeader}</span>
        </div>
        <div className="col col-end" onClick={() => this.nextMonth()}>
          <img className="calendar-icon-right" src={chevronRight} alt="next month" />
        </div>
      </div>
    );
  }

  // Rendering Day names (Sun ~ Sat)
  renderDays() {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const startDate = moment().startOf('week');
      days.push(
        <div className="col col-center" key={i}>
          {startDate.add(i, 'd').format('ddd')}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  getPoints(day) {
    let points = 0;
    const cellDiary = this.props.diaries.find(diary => {
      return diary.yyyymmdd.toString() === moment(day).format('YYYYMMDD');
    });
    if (cellDiary) {
      points = cellDiary.points;
    }
    return points;
  }

  renderCells() {
    const selectedDate = moment(this.props.match.params.date, 'YYYYMMDD');
    const day = moment(this.props.match.params.date, 'YYYYMMDD')
      .startOf('month').startOf('week');
    const endDate = moment(this.props.match.params.date, 'YYYYMMDD')
      .endOf('month').endOf('week');

    const rows = [];
    let days = [];
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.format('D');
        const cloneDay = day.toDate();

        // Get Points for the day
        let points = this.getPoints(day);
        days.push(
          <div
            className={`col cell ${
              day.isSame(selectedDate, 'day') ? 'selected' : ''
            }`}
            key={day}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <div className="bg">{points}</div>
          </div>
        );
        day.add(1, 'd');
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick(day) {
    const formattedDate = moment(day).format('YYYYMMDD');
    this.props.history.push(`/dashboard/${formattedDate}`);
  }

  nextMonth() {
    const newDate = moment(this.props.match.params.date, 'YYYYMMDD')
      .add(1, 'month').format('YYYYMMDD');
    this.props.history.push(`/dashboard/${newDate}/calendar`);
  }

  prevMonth() {
    const newDate = moment(this.props.match.params.date, 'YYYYMMDD')
      .subtract(1, 'month').format('YYYYMMDD');
    this.props.history.push(`/dashboard/${newDate}/calendar`);
  }

  render() {
    return (
      <div>
        <header>
          <h2 className="screen-header">Calendar</h2>
        </header>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  diaries: state.diary.diaries
});

export default connect(mapStateToProps)(Calendar);