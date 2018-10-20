import React from 'react';
import { connect } from 'react-redux';
import './points-header.css';
class PointsHeader extends React.Component {
  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="points-header">
        <h2 className="points-header-heading">Today&apos;s Points</h2>
        <div className="points-progress">
          <div className="day-points">
            <div className="points-count">{this.props.currentDiary.points}</div>
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
  currentDiary: state.diary.currentDiary,
  currentUser: state.auth.currentUser,
  loading: state.diary.loading
});

export default connect(mapStateToProps)(PointsHeader);