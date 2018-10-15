import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty } from '../validators';
import { addNewFood } from '../actions/food-actions';

export class NewFoodForm extends React.Component {
  onSubmit(values) {
    const newFood = { ...values };
    return this.props.dispatch(addNewFood(newFood))
      .then(this.props.history.push('/dashboard/add'));
  }

  render() {
    return (
      <form
        className="new-food"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <label htmlFor="name">Name</label>
        <Field
          component={Input}
          type="text"
          name="name"
          validate={[required, nonEmpty]}
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

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(NewFoodForm);
