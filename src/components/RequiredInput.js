import React from "react";
import CustomInput from "./CustomInput";

const RequiredInput = ({ formik, type, name }) => {
  return (
    <>
      <CustomInput
        type={type}
        placeholder={`Enter ${name}`}
        label={`Enter ${name}`}
        name={name}
        onCh={formik.handleChange(name)}
        onBr={formik.handleBlur(name)}
        val={formik.values[name]}
      />
      <div className="error">{formik.touched[name] && formik.errors[name]}</div>
    </>
  );
};

export default RequiredInput;
