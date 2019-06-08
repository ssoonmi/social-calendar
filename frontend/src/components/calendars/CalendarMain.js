import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './CalendarMain.css';

let years = {};

function getWeeksInMonth(month, year) {
  let date = new Date(year, month, 1);
  const weeks = [];
  let currentWeek = 0;
  while (date.getMonth() === month) {
    if (!weeks[currentWeek]) {
      weeks[currentWeek] = [];
    }
    const newDate = new Date(date);
    weeks[currentWeek][newDate.getDay()] = newDate;
    if (date.getDay() === 6) {
      if (currentWeek === 0) {
        let currentDay = 0;
        while (!weeks[currentWeek][currentDay]) {
          const pastDate = new Date(weeks[currentWeek][6]);
          pastDate.setDate(pastDate.getDate() - 6 + currentDay);
          weeks[currentWeek][currentDay] = pastDate;
          currentDay++;
        }
      }
      currentWeek++;
    }
    date.setDate(date.getDate() + 1);
  }
  
  let currentDay = 6;
  while (!weeks[currentWeek][currentDay]) {
    const pastDate = new Date(weeks[currentWeek][0]);
    pastDate.setDate(pastDate.getDate() + currentDay);
    weeks[currentWeek][currentDay] = pastDate;
    currentDay--;
  }
  return weeks;
}

function CalendarMain({ calendars, shownCalendars }) {
  const [date, setDate] = useState(new Date());
  const [calculatingMonth, setCalculatingMonth] = useState(true);
  const year = date.getFullYear();
  const month = date.getMonth();
  if (!years[year]) years[year] = {};

  useEffect(() => {
    if (!years[year][month]) years[year][month] = getWeeksInMonth(month, year);
    setCalculatingMonth(null);
  }, [date]);

  return (
    <>
      <div className="calendar">
        <div className="month">
        <h2>{date.toLocaleString('en-US', { month: 'long' })}</h2>
        {years[year][month] && years[year][month].map((week) => {
          return (
            <div className="week">
              {week.map((day) => {
                return (
                  <div className="day">{day.getDate()}</div>
                );
              })}
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
}

const msp = state => {
  return {
    calendars: Object.values(state.entities.calendars),
    shownCalendars: state.ui.shownCalendars
  };
}

const mdp = dispatch => {
  return {
    
  }
}

export default connect(msp, mdp)(CalendarMain);