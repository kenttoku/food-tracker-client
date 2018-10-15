import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
  componentDidMount() {
  }

  render() {
    console.log(this.props);
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
