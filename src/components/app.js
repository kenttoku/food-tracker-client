import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
// Components
import AddFoodScreen from './add-food-screen';
import Dashboard from './dashboard';
import EditFoodForm from './edit-food-form';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import LoginPage from './login-page';
import Navbar from './navbar';
import NewFoodForm from './new-food-form';
import RegistrationPage from './registration-page';
import SettingsScreen from './settings-screen';
// Actions
import { refreshAuthToken } from '../actions/auth-actions';
import {
  fetchDiary,
  setEntries
} from '../actions/diary-actions';

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchDiary(this.props.date))
      .then(() => this.props.dispatch(setEntries()));
  }


  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <HeaderBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/login" component={LoginPage} />
        <Switch>
          <Route path="/dashboard/edit/:date/:entryId" component={EditFoodForm} />
          <Route path="/dashboard/add" component={AddFoodScreen} />
          <Route path="/dashboard/newfood" component={NewFoodForm} />
          <Route path="/dashboard/settings" component={SettingsScreen} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.diary.date,
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
