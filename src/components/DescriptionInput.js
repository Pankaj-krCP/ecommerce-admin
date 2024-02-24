import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DescriptionInput = ({ formik }) => {
  return (
    <>
      <div className="">
        <ReactQuill
          theme="snow"
          name="description"
          onChange={formik.handleChange("description")}
          onBlur={() => formik.setFieldTouched("description", true)}
          value={formik.values.description}
        />
      </div>
      <div className="error">
        {formik.touched.description && formik.errors.description}
      </div>
    </>
  );
};

export default DescriptionInput;
