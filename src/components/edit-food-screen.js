import React from 'react';
import EditFoodForm from './edit-food-form';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchAllDiaries,
  fetchDiary,
  setEntries
} from '../actions/diary-actions';
import { isValidDate } from '../actions/utils';


class EditFoodScreen extends React.Component {
  componentDidMount() {
    if (isValidDate(this.props.match.params.date)) {
      this.props.dispatch(fetchDiary(this.props.match.params.date))
        .then(() => this.props.dispatch(setEntries()));
    }
  }

  render() {
    console.log(this.props.loading);
    if (this.props.loading) {
      return <div>Loading...</div>;
    }
    return (
      <Route path="/dashboard/:date/edit/:entryId" component={EditFoodForm} />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.diary.loading
});

export default connect(mapStateToProps)(EditFoodScreen);
