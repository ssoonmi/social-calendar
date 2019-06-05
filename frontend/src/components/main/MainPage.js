import React from 'react';
import { connect } from 'react-redux';

function AuthMainPage() {
  return (
    <h1>Main page when not logged in</h1>
  );
}

function ProtectedMainPage({ currentUser }) {
  return (
    <h1>Main page when logged in</h1>
  );
}

function MainPage(props) {
  if (props.loggedIn) return <ProtectedMainPage {...props} />
  else return <AuthMainPage />
}

const msp = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user
  };
};

const mdp = dispatch => {
  return {

  };
};

export default connect(msp, mdp)(MainPage);