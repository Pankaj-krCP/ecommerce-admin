import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import colorSchema from "../utils/schema/colorSchema";
import RequiredColorInput from "./RequiredColorInput";
import {
  createColor,
  resetState as colorResetState,
} from "../features/color/colorSlice";
import { message } from "antd";

const ColorForm = () => {
  const [rgbColor, setRgbColor] = useState("");
  const [nameColor, setNameColor] = useState("");
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
      hexa_id: "",
    },
    validationSchema: colorSchema,
    onSubmit: (value) => {
      if (!rgbColor.startsWith("#")) {
        message.error("Select Valid Color!");
      } else {
        dispatch(createColor(value));
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
        <RequiredColorInput
          formik={formik}
          type={"color"}
          name={"hexa_id"}
          color={rgbColor}
          setColor={setNameColor}
        />
        <RequiredColorInput
          formik={formik}
          type={"text"}
          name="title"
          color={nameColor}
          setColor={setRgbColor}
        />
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
