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
          {categoryFields}
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
