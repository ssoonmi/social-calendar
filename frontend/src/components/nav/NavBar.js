import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { AuthComponent, ProtectedComponent } from '../../util/component_util';
import { Link } from 'react-router-dom';

function AuthRightNav() {
  return (
    <>
      <li>
        <Link to="/login">Log In</Link> 
      </li>
      <li>
        <Link to="/signup">Sign Up</Link> 
      </li>
    </>
  );
}

function ProtectedRightNav({ logout, currentUser }) {
  return (
    <>
      <li>
        <div>Hello {currentUser.username}!</div>
      </li>
      <li>
        <div onClick={() => logout()}>Log Out</div>
      </li>
    </>
  );
}

function NavBar(props) {
  return (
    <nav className="main-nav">
      <ul className="right-nav">
        <AuthComponent {...props} component={AuthRightNav} />
        <ProtectedComponent {...props} component={ProtectedRightNav} />
      </ul>
    </nav>
  );
}

const msp = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user
  };
};

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(msp, mdp)(NavBar);