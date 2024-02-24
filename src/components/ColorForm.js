import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import colorSchema from "../utils/schema/colorSchema";
import RequiredInput from "./RequiredInput";
import {
  createColor,
  resetState as colorResetState,
} from "../features/color/colorSlice";

const ColorForm = () => {
  const dispatch = useDispatch();

  const newColorState = useSelector((state) => state.color);

  useEffect(() => {
    const { isSuccess, createdColor } = newColorState;
    if (isSuccess && createdColor != "") {
      formik.resetForm();
    }
    setTimeout(() => {
      dispatch(colorResetState());
    }, 100);
  }, [newColorState.isSuccess, newColorState.isError]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: colorSchema,
    onSubmit: (value) => {
      dispatch(createColor(value));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
        <RequiredInput formik={formik} type={"text"} name={"title"} />
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Color
        </button>
      </form>
    </div>
  );
};

export default ColorForm;
