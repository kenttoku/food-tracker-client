import React from 'react';
import { connect } from 'react-redux';

import SettingsForm from './settings-form';
import requiresLogin from './requires-login';

class SettingsScreen extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h2 className="screen-header">Settings</h2>
        </header>
        <SettingsForm />
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
