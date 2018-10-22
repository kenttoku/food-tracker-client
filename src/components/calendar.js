import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllDiaries, fetchDiary } from '../actions/diary-actions';

import chevronLeft from '../assets/baseline-chevron_left-24px.svg';
import chevronRight from '../assets/baseline-chevron_right-24px.svg';
import './calendar.css';
import HeaderBar from './header-bar';

class Calendar extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllDiaries());
    this.props.dispatch(fetchDiary(this.props.match.params.date));
  }

  renderHeader() {
    const calHeader = moment(this.props.match.params.date, 'YYYYMMDD')
      .format('MMM YYYY');
    const prevDate = moment(this.props.match.params.date, 'YYYYMMDD')
      .subtract(1, 'month').format('YYYYMMDD');

    const nextDate = moment(this.props.match.params.date, 'YYYYMMDD')
      .add(1, 'month').format('YYYYMMDD');
    return (
      <div className="calendar-header row flex-middle">
        <Link to={`/dashboard/${prevDate}/calendar`}>
          <div className="col col-start">
            <img className="calendar-icon-left" src={chevronLeft} alt="previous month" />
          </div>
        </Link>
        <div className="col col-center">
          <span>{calHeader}</span>
        </div>
        <Link to={`/dashboard/${nextDate}/calendar`}>
          <div className="col col-end">
            <img className="calendar-icon-right" src={chevronRight} alt="next month" />
          </div>
        </Link>
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
        const date = day.format('YYYYMMDD');

        // Get Points for the day
        let points = this.getPoints(day);
        const cellClass = day.isSame(selectedDate, 'month') ? (day.isSame(selectedDate, 'day') ? 'selected' : '') : 'disabled';
        days.push(
          <Link to={`/dashboard/${date}`}
            className={`col cell ${cellClass}`}
            key={day}>
            <span className="number">{formattedDate}</span>
            <div className="bg">{points}</div>
          </Link>
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

  render() {
    return (
      <div>
        <HeaderBar title="Calendar"/>
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