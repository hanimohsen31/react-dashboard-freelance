import React from "react";

export const Input = (props) => {
  const handleChange = (e) => {
    props.setValue(e.target.value);
  };

  return (
    <div className={`Input my-3 ${props.wrapperClass}`}>
      <label className={`mb-2 ${props.labelClass}`} htmlFor={props.name}>
        {props.label}
      </label>
      <input
        onChange={handleChange}
        value={props.value}
        type={props.type}
        // placeholder={props.label}
        name={props.name}
        className={`form-control text-end ${props.inputClass}`}
        required
      />
    </div>
  );
};
