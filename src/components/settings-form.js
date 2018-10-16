import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users-actions';
import { login } from '../actions/auth-actions';
import Input from './input';
import { required, nonEmpty, isTrimmed } from '../validators';

export class SettingsForm extends React.Component {
  onSubmit(values) {
    console.log('hello');
    // const { username, password } = values;
    // const user = { username, password };
    // return this.props
    //   .dispatch(registerUser(user))
    //   .then(() => this.props.dispatch(login(username, password)));
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
