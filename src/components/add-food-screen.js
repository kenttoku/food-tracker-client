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

export class AddFoodScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllFood());
  }

  addFood(foodId) {
    const food = this.props.foodList.find(food => food.id === foodId);
    const date = this.props.match.params.date;
    return this.props.dispatch(addFoodToDiary(food, date))
      .then(this.props.history.push(`/dashboard/${this.props.match.params.date}`));
  }
  render() {
    if (this.props.loading) {
      return <Spinner className="spinner"  name="pacman" />;
    }
    const foodListElements = this.props.foodList.map(food => {
      return (
        <li key={food.id} className="food-list-item">
          {food.name}
          <button onClick={() => this.addFood(food.id)} aria-label={`add ${food.name}`}>
            <img src={addButton} width="16px" alt="add food" />
          </button>
        </li>);
    });
    return (
      <div className="container">
        <HeaderBar title="Add Food"/>
        <main>
          <div className="add-food">
            <Link to={`/dashboard/${this.props.match.params.date}/newfood`}>
              <button className="btn-black new-food-button">Create New Food</button>
            </Link>
            <ul className="food-list">
              {foodListElements}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  foodList: state.food.foodList,
  loading: state.food.loading || state.diary.loading || state.auth.loading
});

export default requiresLogin()(connect(mapStateToProps)(AddFoodScreen));
