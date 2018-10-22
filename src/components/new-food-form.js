import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty } from '../validators';
import { addNewFood } from '../actions/food-actions';
import { addFoodToDiary } from '../actions/diary-actions';


const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue0 = minValue(0);

export class NewFoodForm extends React.Component {
  onSubmit(values) {
    const { date, ...newFood } = values;
    const urlDate = moment(date).format('YYYYMMDD');
    return this.props.dispatch(addNewFood(newFood))
      .then(res => this.props.dispatch(addFoodToDiary(res.food, date)))
      .then(this.props.history.push(`/dashboard/${urlDate}`));
  }

  render() {
    return (
      <div className="form-container">
        <form
          className="new-food"
          onSubmit={this.props.handleSubmit(values =>this.onSubmit(values))}
        >
          <Field component={Input} type="date" name="date" label="Date" />
          <Field
            component={Input}
            type="text"
            name="name"
            validate={[required, nonEmpty]}
            value="0"
            label="Name"
          />
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="fruits" label="Fruits"  />
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="vegetables" label="Vegetables"/>
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="wholeGrains" label="Whole Grains" />
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="leanProteins" label="Lean Proteins" />
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="nutsAndSeeds" label="Nuts and Seeds" />
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="dairy" label="Dairy" />
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="refinedGrains" label="Refined Grains" />
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="fattyProteins" label="Fatty Proteins" />
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="sweets" label="Sweets" />
          <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="friedFoods" label="Fried Foods" />
          <button
            type="submit"
            disabled={this.props.pristine || this.props.submitting}>
          Add New Food
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let date = moment().format('YYYY-MM-DD');
  if (props.match.params.date) {
    date = moment(props.match.params.date, 'YYYYMMDD').format('YYYY-MM-DD');
  }
  return {
    initialValues: {
      date
    }
  };
};

const form = reduxForm({
  form: 'new-food',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('new-food', Object.keys(errors)[0]))
});

export default connect(mapStateToProps)((form)(NewFoodForm));
