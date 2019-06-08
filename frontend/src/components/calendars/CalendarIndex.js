import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCalendars } from '../../actions/calendar_actions';
import CalendarIndexItem from './CalendarIndexItem';
import './CalendarIndex.css';
import CalendarCreateForm from './CalendarCreateForm';
import Modal from '../shared/Modal';

function CalendarIndex({ calendars, fetchCalendars, resizeBarActive }) {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [closingModal, setClosingModal] = useState(null);

  useEffect(() => {
    fetchCalendars()
      .then(() => setLoading(false), () => setLoading('unsuccessful'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading === 'unsuccessful') return (<ul><li><h2>Could not load calendars</h2></li></ul>);
  if (loading) return (<ul><li><h2>Loading Calendars</h2></li></ul>);

  function closeModal() {
    setModal(null);
    setClosingModal('new');
    setTimeout(() => {
      setClosingModal(null);
    }, 200);
  }

  return (
    <ul>
      <li>
        <h2>Calendars</h2>
        <button onClick={() => setModal('new')}><i className="fas fa-plus"></i></button>
        {(modal || resizeBarActive) && <Modal clickListener={closeModal} />}
        <div className={`modal-child${modal && !closingModal ? ' show' : ''}${closingModal ? ' hide' : ''}`}>
          {(modal === 'new' || closingModal === 'new') && (
          <>
            <CalendarCreateForm onSubmit={closeModal} />
            <div 
              className="exit-modal-button" 
              onClick={closeModal}>
              <i className="far fa-times-circle" />
            </div>
          </>)}
        </div>
      </li>
      {calendars.map(calendar => (
        <CalendarIndexItem 
          key={calendar._id} 
          calendar={calendar} />
      ))}
    </ul>
  );
}

const msp = state => {
  return {
    currentUser: state.session.user,
    calendars: Object.values(state.entities.calendars)
  };
};

const mdp = dispatch => {
  return {
    fetchCalendars: () => dispatch(fetchCalendars())
  };
};

export default connect(msp, mdp)(CalendarIndex);