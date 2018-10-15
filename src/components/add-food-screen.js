import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from './requires-login';

class AddFoodScreen extends React.Component {
  render() {
    console.log('addfoodscreen');
    return (
      <div className="add-food">
        <div>Search Bar</div>
        <ul>
          <li>Food 1</li>
          <li>Food 2</li>
          <li>Food 3</li>
        </ul>
        <div>New Food Button</div>
      </div>
    );
  }
}

export default requiresLogin()(connect()(AddFoodScreen));
