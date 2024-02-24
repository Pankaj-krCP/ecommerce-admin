import { Select } from "antd";
import React from "react";

const RequiredMultiSelect = ({ formik, value, name, options, cb }) => {
  return (
    <>
      <Select
        mode="multiple"
        allowClear
        className="w-100"
        placeholder={`Select ${name}`}
        value={value}
        onChange={(e) => cb(e)}
        options={options}
      />
      <div className="error">{formik.touched[name] && formik.errors[name]}</div>
    </>
  );
};

export default RequiredMultiSelect;
