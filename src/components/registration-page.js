import React from 'react';
import moment from 'moment';
import HeaderBar from './header-bar';
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
    <div className="registration-page">
      <HeaderBar title="Register"/>
      <main>
        <RegistrationForm />
        <Link to="/"><button className="btn-black">Back</button></Link>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
