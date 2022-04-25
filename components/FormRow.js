import React from 'react';

export default function FormRow({ labelText, type, name, value, onChange }) {
  return (
    <div className='form-row'>
      <label className='form-label'>{labelText}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className='form-input'
      />
    </div>
  );
}
