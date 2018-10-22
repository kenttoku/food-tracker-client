import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
// Actions
import { addFoodToDiary } from '../actions/diary-actions';
import { fetchAllFood } from '../actions/food-actions';
import './add-food-screen.css';
import addButton from '../assets/baseline-add-24px.svg';

class AddFoodScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllFood());
  }

  addFood(foodId) {
    const food = this.props.foodList.find(food => food.id === foodId);
    const date = this.props.match.params.date;
    return this.props.dispatch(addFoodToDiary(food, date))
      .then(this.props.history.push(`/dashboard/${this.props.match.params.date}`));
  }
  // TODO: Find a better button or idea for adding food
  render() {
    const foodListElements = this.props.foodList.map(food => {
      return (
        <li key={food.id} className="food-list-item">
          {food.name}
          <a onClick={() => this.addFood(food.id)}>
            <img src={addButton} alt="add food" />
          </a>
        </li>);
    });
    return (
      <div className="add-food">
        <header>
          <h2 className="screen-header">Add Food</h2>
        </header>
        <ul className="food-list">
          {foodListElements}
        </ul>
        <Link to={`/dashboard/${this.props.match.params.date}/newfood`}>New Food</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  foodList: state.food.foodList,
});

export default requiresLogin()(connect(mapStateToProps)(AddFoodScreen));
