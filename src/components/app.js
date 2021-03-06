import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
// Components
import AddFoodScreen from './add-food-screen';
import Calendar from './calendar';
import Dashboard from './dashboard';
import EditFoodScreen from './edit-food-screen';
import LandingPage from './landing-page';
import LoginPage from './login-page';
import Navbar from './navbar';
import NewFoodScreen from './new-food-screen';
import RegistrationPage from './registration-page';
import SettingsScreen from './settings-screen';
// Actions
import { refreshAuthToken } from '../actions/auth-actions';
// Styling
import './app.css';
import './form.css';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }

    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
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
        <Route path="/dashboard/:date" component={Navbar} />
        <Switch>
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/dashboard/:date/calendar" component={Calendar} />
          <Route path="/dashboard/:date/settings" component={SettingsScreen} />
          <Route path="/dashboard/:date/edit/:entryId" component={EditFoodScreen} />
          <Route path="/dashboard/:date/add" component={AddFoodScreen} />
          <Route path="/dashboard/:date/newfood" component={NewFoodScreen} />
          <Route path="/dashboard/:date" component={Dashboard} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
