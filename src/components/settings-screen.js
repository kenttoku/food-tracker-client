import React from 'react';
import { connect } from 'react-redux';

import SettingsForm from './settings-form';
import requiresLogin from './requires-login';
import { clearAuth } from '../actions/auth-actions';
import { clearAuthToken } from '../local-storage';

class SettingsScreen extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    return (
      <div>
        <header>
          <h2 className="screen-header">Settings</h2>
        </header>
        <SettingsForm />
        <button onClick={() => this.logOut()}>Log out</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(SettingsScreen));
