import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { Redirect } from 'react-router-dom';
import { required, nonEmpty } from '../validators';
// Actions
import { addNewFood } from '../actions/food-actions';
import { addFoodToDiary, deleteFoodFromDiary, setEntries } from '../actions/diary-actions';
import { isValidDate } from '../actions/utils';


const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue0 = minValue(0);

export class EditFoodForm extends React.Component {
  onSubmit(values) {
    const { date, ...newFood } = values;
    const urlDate = date.split('-').join('');
    return this.props.dispatch(addNewFood(newFood))
      .then(res => this.props.dispatch(addFoodToDiary(res.food, date)))
      .then(() => this.props.dispatch(setEntries()))
      .then(() => this.props.dispatch(deleteFoodFromDiary(this.props.entry._id)))
      .then(() => this.props.dispatch(setEntries()))
      .then(this.props.history.push(`/dashboard/${urlDate}`));
  }

  render() {
    if (!isValidDate(this.props.date)) {
      return <Redirect to="/" />;
    }
    return (
      <form
        className="edit-food"
        onSubmit={this.props.handleSubmit(values =>this.onSubmit(values))}
      >
        <label htmlFor="date">Date</label>
        <Field component={Input} type="date" name="date"/>
        <label htmlFor="name">Name</label>
        <Field
          component={Input}
          type="text"
          name="name"
          validate={[required, nonEmpty]}
          value="0"
        />
        <label htmlFor="fruits">Fruits</label>
        <Field component={Input} type="number" validate={minValue0} name="fruits" />
        <label htmlFor="vegetables">Vegetables</label>
        <Field component={Input} type="number" validate={minValue0} name="vegetables" />
        <label htmlFor="wholeGrains">Whole Grains</label>
        <Field component={Input} type="number" validate={minValue0} name="wholeGrains" />
        <label htmlFor="leanProteins">Lean Proteins</label>
        <Field component={Input} type="number" validate={minValue0} name="leanProteins" />
        <label htmlFor="nutsAndSeeds">Nuts and Seeds</label>
        <Field component={Input} type="number" validate={minValue0} name="nutsAndSeeds" />
        <label htmlFor="dairy">Dairy</label>
        <Field component={Input} type="number" validate={minValue0} name="dairy" />
        <label htmlFor="refinedGrains">Refined Grains</label>
        <Field component={Input} type="number" validate={minValue0} name="refinedGrains" />
        <label htmlFor="fattyProteins">Fatty Proteins</label>
        <Field component={Input} type="number" validate={minValue0} name="fattyProteins" />
        <label htmlFor="sweets">Sweets</label>
        <Field component={Input} type="number" validate={minValue0} name="sweets" />
        <label htmlFor="friedFoods">Fried Foods</label>
        <Field component={Input} type="number" validate={minValue0} name="friedFoods" />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  let date = props.match.params.date;
  if (date) {
    date = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6);
  }
  const entry = state.diary.entries.find(entry => {
    return entry._id === props.match.params.entryId;
  });
  const initialValues = {
    date
  };

  if (entry) {
    initialValues.name = entry.food.name;
    initialValues.fruits = entry.food.fruits;
    initialValues.vegetables = entry.food.vegetables;
    initialValues.wholeGrains = entry.food.wholeGrains;
    initialValues.leanProteins = entry.food.leanProteins;
    initialValues.nutsAndSeeds = entry.food.nutsAndSeeds;
    initialValues.dairy = entry.food.dairy;
    initialValues.refinedGrains = entry.food.refinedGrains;
    initialValues.fattyProteins = entry.food.fattyProteins;
    initialValues.sweets = entry.food.sweets;
    initialValues.friedFoods = entry.food.friedFoods;
  }

  return {
    initialValues,
    entry,
    date: props.match.params.date
  };
};

const form = reduxForm({
  form: 'edit-food',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('edit-food', Object.keys(errors)[0]))
})(EditFoodForm);

export default connect(mapStateToProps)(form);
