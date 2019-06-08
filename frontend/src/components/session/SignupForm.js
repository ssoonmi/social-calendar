import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signup, clearErrors } from '../../actions/session_actions';
import { Input } from '../shared/form_elements';
import { Link } from 'react-router-dom';
import './SessionForm.css';

function SignupForm({ errors, signup, clearErrors }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  useEffect(() => {
    return clearErrors;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ email, username, password, password2 });
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <Input
        autoFocus={true}
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email} />
      <Input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username} />
      <Input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password} />
      <Input
        type="password"
        value={password2}
        placeholder="Confirm Password"
        onChange={(e) => setPassword2(e.target.value)}
        error={errors.password2} />
      <input type="submit" value="Sign Up" />
      <div>Already a member? <Link to="/login">Log In</Link></div>
    </form>
  );
}

const msp = state => {
  return {
    errors: state.errors.session
  };
};

const mdp = dispatch => {
  return {
    signup: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(msp, mdp)(SignupForm);