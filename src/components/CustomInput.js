import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname, label, id, val, onCh, onBr } =
    props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        name={name}
        className={`form-control ${classname}`}
        placeholder={placeholder}
        id={id}
        value={val}
        onChange={onCh}
        onBlur={onBr}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
