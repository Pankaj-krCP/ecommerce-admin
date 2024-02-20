import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname, label, id, val, onCh } = props;
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        name={name}
        className={`form-control ${classname}`}
        placeholder={placeholder}
        id={id}
        value={val}
        onChange={onCh}
        onBlur={onCh}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
