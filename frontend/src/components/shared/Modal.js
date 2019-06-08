import React, { useEffect } from 'react';
import './Modal.css';

export default function Modal({ backgroundColor, clickListener }) {
  backgroundColor = backgroundColor || 'transparent';

  useEffect(() => {
    const eventListener = event => {
      if (event.which === 27) {
        clickListener();
      }
    };
    document.addEventListener("keydown", eventListener);

    return () => {
      document.removeEventListener("keydown", eventListener)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div 
      className="modal" 
      style={{ backgroundColor }}
      onClick={clickListener} />
  );
}