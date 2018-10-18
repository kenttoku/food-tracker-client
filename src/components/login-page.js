import React from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Components
import LoginForm from './login-form';

export function LoginPage(props) {
  if (props.loggedIn) {
    const today = dateFns.format(new Date(), 'YYYYMMDD');
    return <Redirect to={`/dashboard/${today}`} />;
  }

  return (
    <div className="home">
      <h2>Log in</h2>
      <LoginForm />
      <Link to="/"><button className="btn-black">Back</button></Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
