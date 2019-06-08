import React from 'react';
import { connect } from 'react-redux';
import Modal from '../shared/Modal';

function ProfileDropdown({ currentUser, close }) {
  return (
    <>
      <Modal clickListener={close} />
      <ul className="profile-dropdown">
        <li>
          <div>
            Hello {currentUser.username}!
          </div>
        </li>
        <li>
          <div>
            Profile information
          </div>
        </li>
      </ul>
    </>
  )
}

const msp = state => {
  return {
    currentUser: state.session.user
  };
};

const mdp = dispatch => {
  return {

  };
};

export default connect(msp, mdp)(ProfileDropdown);