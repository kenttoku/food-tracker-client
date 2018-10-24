import React from 'react';
import EditFoodForm from './edit-food-form';
import { connect } from 'react-redux';
import HeaderBar from './header-bar';
import { fetchDiary } from '../actions/diary-actions';
import { isValidDate } from '../actions/utils';
import './edit-food-screen.css';
import Spinner from 'react-spinkit';

export class EditFoodScreen extends React.Component {
  componentDidMount() {
    if (isValidDate(this.props.match.params.date)) {
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
