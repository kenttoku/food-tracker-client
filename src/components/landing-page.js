import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Assets
import './buttons.css';
import './landing-page.css';

export function LandingPage(props) {
  if (props.loggedIn) {
    const today = moment().format('YYYYMMDD');
    return <Redirect to={`/dashboard/${today}`} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-header">
        <h1 className="landing-headline">Food Tracker</h1>
        <p className="landing-subtitle">A simple, intuitive food diary</p>
      </div>
      <div className="landing-page-buttons">
        <Link to="/register">
          <button className="btn-blue landing-btn">Register</button>
        </Link>
        <Link to="/login" >
          <button className="btn-black landing-btn">Login</button>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
