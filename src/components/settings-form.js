import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import Input from './input';
import { setAuthToken, authSuccess } from '../actions/auth-actions';
import { updateUser } from '../actions/users-actions';
import { required, nonEmpty, isTrimmed } from '../validators';
import { saveAuthToken } from '../local-storage';

export class SettingsForm extends React.Component {
  onSubmit(values) {
    const newUsername = values.username;
    const { password, email, goal } = values;
    const updatedUser = {
      newUsername,
      password,
      email,
      goal,
      username: this.props.username
    };
    const urlDate = moment().format('YYYYMMDD');
    return this.props
      .dispatch(updateUser(updatedUser))
      .then(({ authToken }) => {
        if (authToken) {
          const decodedToken = jwtDecode(authToken);
          this.props.dispatch(authSuccess(decodedToken.user));
          this.props.dispatch(this.props.dispatch(setAuthToken(authToken)));
          saveAuthToken(authToken);
        } else {
          throw new Error('Invalid Entry');
        }
      })
      .then(this.props.history.push(`/dashboard/${urlDate}`))
      .catch(err => {
        const { message } = err;
        return Promise.reject(
          new SubmissionError({
            _error: message
          })
        );
      });


  }

  render() {
    return (
      <form
        className="settings"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <Field
          component={Input}
          type="text"
          name="username"
          label="Username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <Field
          component={Input}
          type="text"
          name="email"
          label="Email"
        />
        <Field
          component={Input}
          type="number"
          name="goal"
          label="Goal"
        />
        <Field
          component={Input}
          type="password"
          name="password"
          id="password"
          label="Password"
          validate={[required, nonEmpty]}
        />
        <button
          className="btn-blue settings-button"
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Update Profile
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  initialValues: {
    username: state.auth.currentUser.username,
    email: state.auth.currentUser.email,
    goal: state.auth.currentUser.goal
  }
});

const form = reduxForm({
  form: 'settings',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('settings', Object.keys(errors)[0]))
});

export default withRouter(connect(mapStateToProps)((form)(SettingsForm)));
