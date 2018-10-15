import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllFood } from '../actions/food-actions';
import requiresLogin from './requires-login';

class AddFoodScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllFood());
  }

  render() {
    console.log(this.props);
    const foodListElements = this.props.foodList.map(food => {
      return (<li key={food.id}>{food.name} - [point value] - [delete button]</li>);
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
    foodList: state.food.foodList
  };
};

export default requiresLogin()(connect(mapStateToProps)(AddFoodScreen));
