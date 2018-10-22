import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { Redirect, withRouter } from 'react-router-dom';
import { required, nonEmpty } from '../validators';
// Actions
import { addNewFood } from '../actions/food-actions';
import { addFoodToDiary, deleteFoodFromDiary } from '../actions/diary-actions';
import { isValidDate } from '../actions/utils';


const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue0 = minValue(0);

class EditFoodForm extends React.Component {
  onSubmit(values) {
    const { date, ...newFood } = values;
    const urlDate = date.split('-').join('');
    return this.props.dispatch(addNewFood(newFood))
      .then(res => this.props.dispatch(addFoodToDiary(res.food, date)))
      .then(() => this.props.dispatch(deleteFoodFromDiary(this.props.entry._id)))
      .then(this.props.history.push(`/dashboard/${urlDate}`));
  }

  render() {
    if (!isValidDate(this.props.date)) {
      return <Redirect to="/" />;
    }

    const categories = [
      'Fruits',
      'Vegetables',
      'Whole Grains',
      'Lean Proteins',
      'Nuts And Seeds',
      'Dairy',
      'Refined Grains',
      'Fatty Proteins',
      'Sweets',
      'Fried Foods'
    ];

    const categoryFields = categories.map(category => {
      const camelCategory = category.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return !index ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');

      return (<Field
        key={camelCategory}
        component={Input}
        type="number"
        pattern="[0-9]*"
        validate={minValue0}
        name={camelCategory}
        label={category}
      />);
    });

    return (
      <form
        className="edit-food"
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
        <h3 className="serving-count">Servings</h3>
        {categoryFields}
        <button
          className="btn-black submit-food-button"
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

export default withRouter(connect(mapStateToProps)(form));
