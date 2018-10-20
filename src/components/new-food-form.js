import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty } from '../validators';
import { addNewFood } from '../actions/food-actions';
import { addFoodToDiary, setEntries } from '../actions/diary-actions';


const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue0 = minValue(0);

export class NewFoodForm extends React.Component {
  onSubmit(values) {
    const { date, ...newFood } = values;
    const urlDate = moment(date).format('YYYYMMDD');
    return this.props.dispatch(addNewFood(newFood))
      .then(res => this.props.dispatch(addFoodToDiary(res.food, date)))
      .then(() => this.props.dispatch(setEntries()))
      .then(this.props.history.push(`/dashboard/${urlDate}`));
  }

  render() {
    return (
      <form
        className="new-food"
        onSubmit={this.props.handleSubmit(values =>this.onSubmit(values))}
      >
        <label htmlFor="date">Date</label>
        <Field component={Input} type="date" name="date"/>
        <label htmlFor="name">Name</label>
        <Field
          component={Input}
          type="text"
          name="name"
          pattern="[0-9]*" validate={[required, nonEmpty]}
          value="0"
        />
        <label htmlFor="fruits">Fruits</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="fruits" />
        <label htmlFor="vegetables">Vegetables</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="vegetables" />
        <label htmlFor="wholeGrains">Whole Grains</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="wholeGrains" />
        <label htmlFor="leanProteins">Lean Proteins</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="leanProteins" />
        <label htmlFor="nutsAndSeeds">Nuts and Seeds</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="nutsAndSeeds" />
        <label htmlFor="dairy">Dairy</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="dairy" />
        <label htmlFor="refinedGrains">Refined Grains</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="refinedGrains" />
        <label htmlFor="fattyProteins">Fatty Proteins</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="fattyProteins" />
        <label htmlFor="sweets">Sweets</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="sweets" />
        <label htmlFor="friedFoods">Fried Foods</label>
        <Field component={Input} type="number" pattern="[0-9]*" validate={minValue0} name="friedFoods" />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Add New Food
        </button>
      </form>
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
