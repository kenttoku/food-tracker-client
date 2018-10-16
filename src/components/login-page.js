import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// Components
import LoginForm from './login-form';

export function LoginPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="home">
      <h2>Register</h2>
      <LoginForm />
      <Link to="/">Back</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
