import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleShownCalendar } from '../../actions/shown_calendar_actions';
import { Link } from 'react-router-dom';
import CalendarEditForm from './CalendarEditForm';
import CalendarDeleteForm from './CalendarDeleteForm';
import Modal from '../shared/Modal';

function CalendarIndexItem({ calendar, shownCalendars, toggleShownCalendar }) {
  const [modal, setModal] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [closingModal, setClosingModal] = useState(null);

  function closeModal() {
    setClosingModal(modal);
    setShowButtons(false);
    setModal(null);
    setTimeout(() => {
      setClosingModal(null);
    }, 200);
  }

  return (
    <li onMouseLeave={() => setShowButtons(false)}>
      <button 
        className="checkbox" 
        onClick={() => toggleShownCalendar(calendar._id)}
        onMouseEnter={() => setShowButtons(false)}>
        {shownCalendars[calendar._id] && <i className="fas fa-check" />}
      </button>
      <div className={`info${showButtons ? '' : ' hide'}`}>
        <Link to={`/calendars/${calendar._id}`} >
          <h3>{calendar.name}</h3>
        </Link>
        <div className="menu">
          <button className="ellipsis" onClick={() => setShowButtons(true)}>
            <i className="fas fa-ellipsis-v" />
          </button>
          <div className="buttons">
            <button onClick={() => setModal('edit')}>
              <i className="fas fa-edit"></i>
            </button>
            <button onClick={() => setModal('delete')}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      {modal && <Modal clickListener={closeModal} />}
      <div className={`modal-child${modal && !closingModal ? ' show' : ''}${closingModal ? ' hide' : ''}`}>
        {(modal === 'edit' || closingModal === 'edit') && (
        <CalendarEditForm 
          onSubmit={closeModal} 
          calendar={calendar}/>)}
        {(modal === 'delete' || closingModal === 'delete') && (
        <CalendarDeleteForm 
          onSubmit={closeModal} 
          calendar={calendar}/>)}
        {modal && (
        <div 
          className="exit-modal-button" 
          onClick={closeModal}>
            <i className="far fa-times-circle" />
        </div>)}
      </div>
    </li>
  );
}

const msp = state => {
  return {
    shownCalendars: state.ui.shownCalendars
  };
};

const mdp = dispatch => {
  return {
    toggleShownCalendar: (id) => dispatch(toggleShownCalendar(id))
  };
};

export default connect(msp, mdp)(CalendarIndexItem);