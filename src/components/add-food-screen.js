import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { addFoodToDiary } from '../actions/diary-actions';
import { fetchAllFood } from '../actions/food-actions';
import './add-food-screen.css';
import addButton from '../assets/baseline-add-24px.svg';
import HeaderBar from './header-bar';
import Spinner from 'react-spinkit';

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
    if (this.props.loading) {
      return <Spinner name="pacman" />;
    }
    const foodListElements = this.props.foodList.map(food => {
      return (
        <li key={food.id} className="food-list-item">
          {food.name}
          <button onClick={() => this.addFood(food.id)}>
            <img src={addButton} width="16px" alt="add food" />
          </button>
        </li>);
    });
    return (
      <div className="add-food">
        <HeaderBar title="Add Food"/>
        <main>
          <ul className="food-list">
            {foodListElements}
          </ul>
          <Link to={`/dashboard/${this.props.match.params.date}/newfood`}>
            <button className="btn-black new-food-button">Create New Food</button>
          </Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  foodList: state.food.foodList,
  loading: state.food.loading
});

export default requiresLogin()(connect(mapStateToProps)(AddFoodScreen));
