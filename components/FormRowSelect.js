import React from 'react';

export default function FormRowSelect({
  labelText,
  list,
  name,
  value,
  onChange,
}) {
  return (
    <div className='form-row'>
      <label className='form-label'>{labelText}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className='form-select'
      >
        {list.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
