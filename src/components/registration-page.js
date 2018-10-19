import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Components
import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    const today = moment().format('YYYYMMDD');
    return <Redirect to={`/dashboard/${today}`} />;
  }
  return (
    <div className="home">
      <h2>Register</h2>
      <RegistrationForm />
      <Link to="/"><button className="btn-black">B
    console.log(this.props);ack</button></Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
