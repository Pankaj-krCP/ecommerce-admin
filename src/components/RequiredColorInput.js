import React, { useEffect } from "react";
import CustomInput from "./CustomInput";
import useChangeColor from "../hooks/useChangeColor";

const RequiredColorInput = ({ formik, type, name, color, setColor }) => {
  const colorName = useChangeColor;
  useEffect(() => {
    if (formik.values[name]) {
      setColor(colorName(formik.values[name]));
    }
  }, [formik.values[name]]);

  useEffect(() => {
    formik.setFieldValue(name, color);
  }, [color]);

  return (
    <>
      <CustomInput
        type={type}
        placeholder="Enter Color"
        label="Enter Color"
        name={name}
        onCh={formik.handleChange(name)}
        onBr={formik.handleBlur(name)}
        val={formik.values[name]}
      />
      <div className="error">{formik.touched[name] && formik.errors[name]}</div>
    </>
  );
};

export default RequiredColorInput;
