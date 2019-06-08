import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { AuthComponent, ProtectedComponent } from '../../util/component_util';
import { Link } from 'react-router-dom';
import './NavBar.css';
import ProfileDropdown from './ProfileDropdown';

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
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <li className="profile-button">
        <div 
          className="default-profile"
          onClick={() => setShowDropdown(!showDropdown)}>
          <i className="fas fa-user" />
        </div>
        {showDropdown && <ProfileDropdown close={() => setShowDropdown(!showDropdown)} />}
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
      <h1><Link to="/" >Social Calendar</Link></h1>
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