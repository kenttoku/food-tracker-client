import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Assets
import './buttons.css';
import './landing-page.css';
import bg from '../assets/food-business-lunch-restaurant-lunch-163018.jpeg';

export function LandingPage(props) {
  if (props.loggedIn) {
    const today = moment().format('YYYYMMDD');
    return <Redirect to={`/dashboard/${today}`} />;
  }

  return (
    <div className="landing-page">
      <section className="landing-main">
        <div className="bg">
          <img src={bg} />
        </div>

        <div className="landing-header">
          <h1 className="landing-headline">Food Tracker</h1>
          <p className="landing-subtitle">A simple, intuitive food diary</p>
        </div>
        <div className="landing-page-buttons">
          <Link to="/register">
            <button className="btn-blue landing-btn">Register</button>
          </Link>
          <Link to="/login" >
            <button className="btn-green landing-btn">Login</button>
          </Link>
        </div>
      </section>
    </div>

  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
