import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { withRouter } from 'react-router-dom';
import { required, nonEmpty } from '../validators';
// Actions
import { addNewFood, setHelp } from '../actions/food-actions';
import { addFoodToDiary, deleteFoodFromDiary } from '../actions/diary-actions';


const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue0 = minValue(0);

export class EditFoodForm extends React.Component {
  componentDidMount() {
    this.props.dispatch(setHelp(false));
  }

  onSubmit(values) {
    const { date, ...newFood } = values;
    const urlDate = date.split('-').join('');
    return this.props.dispatch(addNewFood(newFood))
      .then(res => this.props.dispatch(addFoodToDiary(res.food, date)))
      .then(() => this.props.dispatch(deleteFoodFromDiary(this.props.entry._id)))
      .then(this.props.history.push(`/dashboard/${urlDate}`));
  }

  helpButtonClicked(e) {
    e.preventDefault();
    this.props.dispatch(setHelp(!this.props.showHelp));
  }

  render() {
    let helpClass = 'hidden';
    if (this.props.showHelp) {
      helpClass = '';
    } else {
      helpClass = 'hidden';
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
        <button className="need-help" onClick={e => this.helpButtonClicked(e)}>Need Help?</button>

        <section className={helpClass}>
          <h4>Which category do I choose?</h4>
          <p>Is a tomato a fruit or a vegetable? Pick whichever one you like. Just make sure to use common sense. If you are really having trouble, choose the category that appears lower on the form.</p>

          <h4>How many servings is it?</h4>
          <p>Food labels will tell you different things, but for this system use 100 calories as a guideline for 1 serving</p>
        </section>

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
    date: props.match.params.date,
    showHelp: state.food.showHelp
  };
};

const form = reduxForm({
  form: 'edit-food',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('edit-food', Object.keys(errors)[0]))
})(EditFoodForm);

export default withRouter(connect(mapStateToProps)(form));
