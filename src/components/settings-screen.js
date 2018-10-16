import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import requiresLogin from './requires-login';

class SettingsScreen extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>Settings - {this.props.currentUser.username}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default requiresLogin()(connect(mapStateToProps)(SettingsScreen));
