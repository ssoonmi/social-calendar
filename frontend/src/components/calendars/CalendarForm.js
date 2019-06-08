import React, { useState } from 'react';
import { Input, Textarea } from '../shared/form_elements';
import './CalendarForm.css';

export default function CalendarForm({ 
  submitAction, 
  submitValue, 
  calendar, 
  errors,
  clearErrors,
  onSubmit
}) {
  const [name, setName] = useState(calendar.name);
  const [description, setDescription] = useState(calendar.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAction({ name, description })
      .then((action) => {
        if (!action.errors) {
          clearErrors();
          if (onSubmit) onSubmit();
        }
      });
  }

  return (
    <form className="calendar-form" onSubmit={handleSubmit}>
      <Input
        autoFocus={true}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        error={errors.name}
        type="text" />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a description"
        error={errors.description} 
        maxChars={150} />
      <input type="submit" value={submitValue} />
    </form>
  )
}