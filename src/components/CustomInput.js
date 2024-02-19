import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname, label } = props;
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
