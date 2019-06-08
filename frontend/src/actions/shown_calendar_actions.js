export const TOGGLE_SHOWN_CALENDAR = "TOGGLE_SHOWN_CALENDAR";

export const toggleShownCalendar = (id) => {
  return {
    type: TOGGLE_SHOWN_CALENDAR,
    id
  };
};