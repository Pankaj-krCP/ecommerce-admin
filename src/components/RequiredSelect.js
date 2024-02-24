import React from "react";

const RequiredSelect = ({ formik, name, object }) => {
  return (
    <>
      <select
        className="form-control py-3"
        id=""
        name={name}
        onChange={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        value={formik.values[name]}
      >
        <option value="" disabled>
          Select {name}
        </option>
        {object.map((i, j) => {
          return (
            <option key={j} value={i.title}>
              {i.title}
            </option>
          );
        })}
      </select>
      <div className="error">{formik.touched[name] && formik.errors[name]}</div>
    </>
  );
};

export default RequiredSelect;
