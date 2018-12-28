import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './buttons.css';
import './landing-page.css';
import { demoUser } from '../actions/auth-actions';
import dashboard from '../assets/dashboard-thumbnail.PNG';
import calendar from '../assets/calendar-thumbnail.PNG';
import newFood from '../assets/new-thumbnail.PNG';

export function LandingPage(props) {
  if (props.loggedIn) {
    const today = moment().format('YYYYMMDD');
    return <Redirect to={`/dashboard/${today}`} />;
  }

  return (
    <div className="landing-page">
      <section className="landing-main">
        <div className="landing-header">
          <h1 className="landing-headline">Food Point</h1>
          <p className="landing-subtitle">A simple, intuitive food diary</p>
        </div>
        <div className="landing-page-buttons">
          <Link to="/register">
            <button className="btn-blue landing-btn">Register</button>
          </Link>
          <Link to="/login" >
            <button className="btn-green landing-btn">Login</button>
          </Link>
          <button className="btn-black landing-btn" onClick={() => props.dispatch(demoUser())}>Use Demo Account</button>
        </div>
      </section>
      <div className="container">

        <section className="feature left">
          <img src={dashboard} alt="dashboard screen" />
          <div className="desc">
            <h4>Calories don&apos;t tell the whole picture.</h4>
            <p>200 calories of soda isn&apos;t the same as 200 calories of fruits and vegetables. Food Point&apos;s points system gives you better insight on the quality of your diet, not just your quantity in one convenient location.
            </p>
          </div>
        </section>
        <section className="feature right">
          <img src={newFood} alt="new entry screen" />
          <div className="desc">
            <h4>Add</h4>
            <p>Adding an entry is done in 3 simple steps. Name your entry, Choose the food categories, and enter the serving numbers. Your points will be calculated automatically.
            </p>
          </div>
        </section>
        <section className="feature left">
          <img src={calendar} alt="calendar screen" />
          <div className="desc">
            <h4>Review</h4>
            <p>If you want to check your progress history, the calendar is the answer. Choose a date, and you can see what you ate on that day as well.
            </p>
          </div>
        </section>
      </div>
    </div>

  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
