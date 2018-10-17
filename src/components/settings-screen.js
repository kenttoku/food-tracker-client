import React from 'react';
import { connect } from 'react-redux';

import SettingsForm from './settings-form';
import requiresLogin from './requires-login';

class SettingsScreen extends React.Component {
  render() {
    return (
      <SettingsForm />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(SettingsScreen));
