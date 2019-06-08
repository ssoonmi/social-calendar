import { connect } from 'react-redux';
import { createCalendar, clearErrors } from '../../actions/calendar_actions';
import CalendarForm from './CalendarForm';

const msp = state => {
  return {
    calendar: {
      name: '',
      description: ''
    },
    submitValue: "Create Calendar",
    errors: state.errors.calendar
  };
};

const mdp = dispatch => {
  return {
    submitAction: (calendar) => dispatch(createCalendar(calendar)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(msp, mdp)(CalendarForm);