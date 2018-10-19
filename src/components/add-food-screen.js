import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
// Actions
import { addFoodToDiary, setEntries } from '../actions/diary-actions';
import { fetchAllFood } from '../actions/food-actions';

class AddFoodScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllFood());
  }

  addFood(foodId) {
    const food = this.props.foodList.find(food => food.id === foodId);
    const date = this.props.match.params.date;
    return this.props.dispatch(addFoodToDiary(food, date))
      .then(() => this.props.dispatch(setEntries()))
      .then(this.props.history.push(`/dashboard/${this.props.match.params.date}`));
  }

  render() {
    const foodListElements = this.props.foodList.map(food => {
      return (
        <li key={food.id}>
          {food.name} - [point value] -
          <span onClick={() => this.addFood(food.id)}>[Add]</span>
        </li>);
    });
    return (
      <div className="add-food">
        <Link to={`/dashboard/${this.props.match.params.date}/newfood`}>New Food</Link>
        <ul>
          {foodListElements}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  foodList: state.food.foodList,
});

export default requiresLogin()(connect(mapStateToProps)(AddFoodScreen));
