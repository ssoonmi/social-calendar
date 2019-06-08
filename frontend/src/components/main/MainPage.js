import React from 'react';
import { connect } from 'react-redux';
import CalendarDashboard from '../calendars/CalendarDashboard';


function AuthMainPage() {
  return (
    <h1>Main page when not logged in</h1>
  );
}

function ProtectedMainPage() {
  return (
    <>
      <CalendarDashboard />
    </>
  );
}

function MainPage(props) {
  if (props.loggedIn) return <ProtectedMainPage {...props} />;
  else return <AuthMainPage />;
}

const msp = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user
  };
};

export default connect(msp, null)(MainPage);