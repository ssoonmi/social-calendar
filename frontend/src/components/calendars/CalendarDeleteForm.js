import React from 'react';
import { connect } from 'react-redux';
import { deleteCalendar } from  '../../actions/calendar_actions';
import './CalendarForm.css';

function CalendarDeleteForm({ calendar, deleteCalendar, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
    deleteCalendar(calendar._id);
  }

  function cancel(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="calendar-form" onSubmit={handleSubmit}>
      <div>Are you sure you want to delete '{calendar.name}'?</div>
      <div className="delete-buttons">
        <button className="cancel" onClick={cancel}>Cancel</button>
        <button>Delete</button>
      </div>
    </form>
  );
}

const mdp = dispatch => {
  return {
    deleteCalendar: (id) => dispatch(deleteCalendar(id))
  }
}

export default connect(null, mdp)(CalendarDeleteForm)