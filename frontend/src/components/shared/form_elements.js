import React from 'react';
import AutosizeTextarea from 'react-textarea-autosize';
import './form_elements.css';

export const Input = ({ type, value, onChange, placeholder, error, autoFocus }) => {
  return (
    <label className={error ? "error" : ""}>
      <input
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder} />
      {error ? <span>{error}</span> : null}
    </label>
  );
};

export const Textarea = ({ minRows, value, onChange, placeholder, error, maxChars, autoFocus }) => {
  minRows = minRows || 2;
  function update(e) {
    if (maxChars && e.target.value.length <= maxChars) {
      onChange(e);
    } else if (!maxChars) {
      onChange(e);
    }
  }

  return (
    <label className={error ? "error" : ""}>
      <AutosizeTextarea
        autoFocus={autoFocus}
        minRows={minRows}
        value={value}
        placeholder={placeholder}
        onChange={update} />
      {maxChars ? <span className="chars-left">{maxChars - value.length} left</span> : null}
      {error ? <span>{error}</span> : null}
    </label>
  );
};