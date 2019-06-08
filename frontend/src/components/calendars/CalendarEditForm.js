import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateCalendar, fetchCalendar, clearErrors } from '../../actions/calendar_actions';
import CalendarForm from './CalendarForm';

function CalendarEditForm(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.fetchCalendar(props.calendar._id)
      .then(() => setLoading(false), () => setLoading('unsuccessful'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading === 'unsuccessful') return (<h1>Could not load calendar</h1>);
  
  if (props.calendar) return (<CalendarForm {...props} />);
  else return (<h1>Loading Calendar</h1>);
}

const msp = (state, ownProps) => {
  return {
    // calendar: state.entities.calendars[ownProps.match.params.calendarId],
    submitValue: "Update Calendar",
    errors: state.errors.calendar
  };
};

const mdp = (dispatch, ownProps) => {
  const calendarId = ownProps.calendar._id;
  return {
    submitAction: (calendar) => dispatch(updateCalendar(calendar, calendarId)),
    fetchCalendar: (id) => dispatch(fetchCalendar(id)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(msp, mdp)(CalendarEditForm);