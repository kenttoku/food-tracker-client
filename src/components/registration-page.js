import React from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Components
import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    const today = dateFns.format(new Date(), 'YYYYMMDD');
    return <Redirect to={`/dashboard/${today}`} />;
  }
  return (
    <div className="home">
      <h2>Register</h2>
      <RegistrationForm />
      <Link to="/"><button className="btn-black">Black</button></Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
