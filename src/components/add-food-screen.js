import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addFoodToDiary, setEntries } from '../actions/diary-actions';
import { fetchAllFood } from '../actions/food-actions';
import requiresLogin from './requires-login';

class AddFoodScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllFood());
  }

  addFood(foodId) {
    const food = this.props.foodList.find(food => food.id === foodId);
    const date = this.props.date;
    console.log(food);
    return this.props.dispatch(addFoodToDiary(food, date))
      .then(() => this.props.dispatch(setEntries()))
      .then(this.props.history.push('/dashboard'));
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
        <div>[Search Bar Here]</div>
        <ul>
          {foodListElements}
        </ul>
        <Link to="/dashboard/newfood">New Food</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    foodList: state.food.foodList,
    date: state.diary.date
  };
};

export default requiresLogin()(connect(mapStateToProps)(AddFoodScreen));
