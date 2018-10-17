import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, SubmissionError } from 'redux-form';
import jwtDecode from 'jwt-decode';
// Components
import Input from './input';
// Actions
import { setAuthToken, authSuccess, authError } from '../actions/auth-actions';
import { updateUser } from '../actions/users-actions';
// Other
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
    return this.props
      .dispatch(updateUser(updatedUser))
      .then(authToken => {
        if (authToken) {
          const decodedToken = jwtDecode(authToken);
          this.props.dispatch(authSuccess(decodedToken.user));
          this.props.dispatch(this.props.dispatch(setAuthToken(authToken)));
          saveAuthToken(authToken);
        } else {
          throw new Error('Invalid Entry');
        }
      })
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
        <label htmlFor="username">Username</label>
        <Field
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="email">Email</label>
        <Field
          component={Input}
          type="text"
          name="email"
        />
        <label htmlFor="goal">Goal</label>
        <Field
          component={Input}
          type="number"
          name="goal"
        />
        <label htmlFor="password">Password</label>
        <Field
          component={Input}
          type="password"
          name="password"
          id="password"
          validate={[required, nonEmpty]}
        />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Update Profile
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    initialValues: {
      username: state.auth.currentUser.username,
      email: state.auth.currentUser.email,
      goal: state.auth.currentUser.goal
    }
  };
};

const form = reduxForm({
  form: 'settings',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('settings', Object.keys(errors)[0]))
});

export default connect(mapStateToProps)((form)(SettingsForm));
