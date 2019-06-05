import React from 'react';

export const Input = ({ type, value, onChange, placeholder, error }) => {
  return (
    <label className={error ? "error" : ""}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder} />
      {error ? <span>{error}</span> : null}
    </label>
  );
};