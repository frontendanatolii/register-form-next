'use client'
import React from "react";

interface Props {
  label: string,
  type: string,
  name: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  error: string,
  placeholder: string, 
}

function Input({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder, 
} : Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />

      {error ? <p className="error">{error}</p> : null}
    </div>
  )
};

export default Input;