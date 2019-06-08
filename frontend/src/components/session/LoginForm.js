import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
import { Input } from '../shared/form_elements';
import './SessionForm.css';
import { Link } from 'react-router-dom';

function LoginForm({ errors, login, clearErrors }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return clearErrors;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <Input
        autoFocus={true}
        type="text"
        value={email}
        placeholder="Email or Username"
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email} />
      <Input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password} />
      <input type="submit" value="Log In" />
      <div>Not a member? <Link to="/signup">Sign Up</Link></div>
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
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(msp, mdp)(LoginForm);