import React from 'react';
import EditFoodForm from './edit-food-form';
import { connect } from 'react-redux';
import HeaderBar from './header-bar';
import { fetchDiary } from '../actions/diary-actions';
import { isValidDate } from '../actions/utils';


class EditFoodScreen extends React.Component {
  componentDidMount() {
    if (isValidDate(this.props.match.params.date)) {
      this.props.dispatch(fetchDiary(this.props.match.params.date));
    }
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <HeaderBar title="Edit Entry"/>
        <main>
          <EditFoodForm />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.diary.loading
});

export default connect(mapStateToProps)(EditFoodScreen);
