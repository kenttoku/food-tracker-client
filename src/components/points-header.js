import React from 'react';
import { connect } from 'react-redux';
import './points-header.css';
class PointsHeader extends React.Component {
  render() {
    // TODO: Change points count to display the currect points count
    return (
      <div className="points-header">
        <h2 className="points-header-heading">Today&apos;s Points</h2>
        <div className="points-progress">
          <div className="day-points">
            <div className="points-count">10</div>
            <p className="points-type">Current</p>
          </div>
          <div className="goal-points">
            <div className="points-count">18</div>
            <p className="points-type">Goal</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentDiary: state.diary.currentDiary
});

export default connect(mapStateToProps)(PointsHeader);