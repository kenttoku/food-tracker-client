import React from 'react';
import moment from 'moment';
import EditFoodForm from './edit-food-form';
import { connect } from 'react-redux';
import HeaderBar from './header-bar';
import { fetchDiary } from '../actions/diary-actions';
import './edit-food-screen.css';
import Spinner from 'react-spinkit';

export class EditFoodScreen extends React.Component {
  componentDidMount() {
    if (moment(this.props.match.params.date, 'YYYYMMDD').format() !== 'Invalid date') {
      this.props.dispatch(fetchDiary(this.props.match.params.date));
    }
  }

  render() {
    if (this.props.loading) {
      return <Spinner className="spinner" name="pacman" />;
    }
    return (
      <div className="edit-form">
        <HeaderBar title="Edit Entry"/>
        <main>
          <EditFoodForm />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.food.loading || state.diary.loading || state.auth.loading
});

export default connect(mapStateToProps)(EditFoodScreen);
