import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setHelp } from '../actions/food-actions';

export class HelpSection extends Component {
  componentDidMount() {
    this.props.dispatch(setHelp(false));
  }

  helpButtonClicked(e) {
    e.preventDefault();
    this.props.dispatch(setHelp(!this.props.showHelp));
  }

  render() {
    let helpClass = 'hidden';
    if (this.props.showHelp) {
      helpClass = '';
    } else {
      helpClass = 'hidden';
    }

    return (
      <div>
        <button type="button" className="need-help" onClick={e => this.helpButtonClicked(e)}>Need Help?</button>

        <section className={helpClass}>
          <h4>Which category do I choose?</h4>
          <p>Is a tomato a fruit or a vegetable? Pick whichever one you like. Just make sure to use common sense. If you are really having trouble, choose the category that appears lower on the form.</p>

          <h4>How many servings is it?</h4>
          <p>Food labels will tell you different things, but for this system use 100 calories as a guideline for 1 serving</p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showHelp: state.food.showHelp
});

export default connect(mapStateToProps)(HelpSection);