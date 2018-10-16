import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty } from '../validators';
import { addNewFood } from '../actions/food-actions';
// import { addFoodToDiary } from '../actions/diary-actions';

export class NewFoodForm extends React.Component {
  onSubmit(values) {
    const { date, ...newFood } = values;
    return this.props.dispatch(addNewFood(newFood))
      // .then(res => this.props.dispatch(addFoodToDiary(res.food)))
      .then(this.props.history.push('/dashboard/add'));
  }

  render() {
    return (
      <form
        className="new-food"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <label htmlFor="date">Date</label>
        <Field
          component={Input}
          type="date"
          name="date"
          value="2017-06-01"
        />
        <label htmlFor="name">Name</label>
        <Field
          component={Input}
          type="text"
          name="name"
          validate={[required, nonEmpty]}
          value="0"
        />
        <label htmlFor="fruits">Fruits</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="fruits"
        />
        <label htmlFor="vegetables">Vegetables</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="vegetables"
        />
        <label htmlFor="wholeGrains">Whole Grains</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="wholeGrains"
        />
        <label htmlFor="leanProteins">Lean Proteins</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="leanProteins"
        />
        <label htmlFor="nutsAndSeeds">Nuts and Seeds</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="nutsAndSeeds"
        />
        <label htmlFor="dairy">Dairy</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="dairy"
        />
        <label htmlFor="refinedGrains">Refined Grains</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="refinedGrains"
        />
        <label htmlFor="fattyProteins">Fatty Proteins</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="fattyProteins"
        />
        <label htmlFor="sweets">Sweets</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="sweets"
        />
        <label htmlFor="friedFoods">Fried Foods</label>
        <Field
          component={Input}
          type="number"
          min="0"
          name="friedFoods"
        />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
            Add New Food
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  let date = state.diary.date.toString();
  date = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6);
  return {
    initialValues: {
      date,
      fruits: 0,
      vegetables: 0,
      wholeGrains: 0,
      leanProteins: 0,
      nutsAndSeeds: 0,
      dairy: 0,
      refinedGrains: 0,
      fattyProteins: 0,
      sweets: 0,
      friedFoods: 0
    }
  };
};

const form = reduxForm({
  form: 'new-food',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('new-food', Object.keys(errors)[0]))
});

export default connect(mapStateToProps)((form)(NewFoodForm));
