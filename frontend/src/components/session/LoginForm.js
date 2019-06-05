import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
import { Input } from '../shared/form_elements';

function LoginForm({ errors, login, clearErrors }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      clearErrors();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
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