import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Components
// Assets
import './buttons.css';

export function LandingPage(props) {
  if (props.loggedIn) {
    const today = moment().format('YYYYMMDD');
    return <Redirect to={`/dashboard/${today}`} />;
  }

  return (
    <div className="home">
      <Link to="/register">
        <button className="btn-blue">Register</button>
      </Link>
      <Link to="/login" >
        <button className="btn-black">Login</button>
      </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
