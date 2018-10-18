import React from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { fetchAllDiaries } from '../actions/diary-actions';

import chevronLeft from '../assets/baseline-chevron_left-24px.svg';
import chevronRight from '../assets/baseline-chevron_right-24px.svg';
import './calendar.css';

class Calendar extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllDiaries());
  }

  renderHeader() {
    return (
      <div className="calendar-header row flex-middle">
        <div className="col col-start">
          <img className="calendar-icon-left" src={chevronLeft} alt="previous month" />
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.props.currentMonth, 'MMMM YYYY')}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <img className="calendar-icon-right" src={chevronRight} alt="next month" />
        </div>
      </div>
    );
  }

  // Rendering Day names
  renderDays() {
    const days = [];

    let startDate = dateFns.startOfWeek(this.props.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), 'dddd')}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        let points = 0;
        const cellDiary = this.props.diaries.find(diary => {
          return diary.yyyymmdd.toString() === dateFns.format(day, 'YYYYMMDD');
        });
        if (cellDiary) {
          points = cellDiary.points;
        }
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, selectedDate) ? 'selected' : ''
            }`}
            key={day}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{points}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
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
    const formattedDate = dateFns.format(day, 'YYYYMMDD');
    this.props.history.push(`/dashboard/${formattedDate}`);
  }

  nextMonth() {
    // Change Calendar month
  }

  prevMonth() {
    // Change Calendar month
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentMonth: new Date(),
  selectedDate: new Date(),
  diaries: state.diary.diaries
});

export default connect(mapStateToProps)(Calendar);