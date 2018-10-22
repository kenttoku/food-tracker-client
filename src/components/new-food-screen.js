import React from 'react';
import NewFoodForm from './new-food-form';
import HeaderBar from './header-bar';

export default class NewFoodScreen extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar title="New Entry"/>
        <main>
          <NewFoodForm />
        </main>
      </div>
    );
  }
}