import React, { useState } from 'react';
import CalendarIndex from './CalendarIndex';
import CalendarMain from './CalendarMain';

let indexRef;
let resizeBarRef;

function CalendarDashboard() {
  const [indexWidth, setIndexWidth] = useState(200);
  const [resizeBarActive, setResizeBarActive] = useState(false);

  function mouseDownHandler(e) {
    setResizeBarActive(true);

    function dragHandler(e) {
      e.preventDefault();
      const bar = indexRef.getBoundingClientRect();
      const x = e.clientX - bar.left; //x position within the element.
      if (x < 120) {
        setIndexWidth(120);
      } else if (x < 300) {
        setIndexWidth(x);
      } else {
        setIndexWidth(300);
      }
      document.getElementsByTagName('html')[0].style.cursor = 'grabbing';
      resizeBarRef.style.cursor = 'grabbing';
    }

    document.addEventListener('mousemove', dragHandler, false);

    document.addEventListener('mouseup', function mouseUpHandler(e) {
      document.removeEventListener('mousemove', dragHandler, false);
      document.removeEventListener('mouseup', mouseUpHandler, false);
      document.getElementsByTagName('html')[0].style.cursor = 'default';
      resizeBarRef.style.cursor = 'grab';
      setResizeBarActive(false);
    }, false);
  }

  return (
    <div className="calendar-container">
      <div 
        className="calendar-index" 
        ref={(ref) => indexRef = ref} 
        style={{ width: indexWidth, minWidth: indexWidth }}>
        <CalendarIndex   
          indexWidth={indexWidth} 
          resizeBarActive={resizeBarActive}/>
      </div>
      <div
        className={`resize-bar${resizeBarActive ? ' active' : ''}`}
        onMouseDown={mouseDownHandler}
        ref={(ref) => resizeBarRef = ref} />
      <div className="main-content">
        <CalendarMain />
      </div>
    </div>
  )
}

export default CalendarDashboard;