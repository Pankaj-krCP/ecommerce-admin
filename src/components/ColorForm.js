import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import colorSchema from "../utils/schema/colorSchema";
import RequiredColorInput from "./RequiredColorInput";
import {
  createColor,
  resetMsgState,
  updateAColor,
} from "../features/color/colorSlice";
import useChangeColor from "../hooks/useChangeColor";

const ColorForm = ({ colorId }) => {
  const [rgbColor, setRgbColor] = useState("");
  const [nameColor, setNameColor] = useState("");
  const dispatch = useDispatch();
  const nameToHexa = useChangeColor;
  const newColorState = useSelector((state) => state.color);

  useEffect(() => {
    const { isSuccess, isError, createdColor, updatedColor } = newColorState;
    if (
      (isSuccess && createdColor != "") ||
      (isSuccess && updatedColor != "")
    ) {
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetMsgState());
      }, 100);
    }
    if (isError) {
      setTimeout(() => {
        dispatch(resetMsgState());
      }, 100);
    }
  }, [newColorState.isSuccess, newColorState.isError]);

  const colorName = newColorState.colors.filter((ele) => ele._id == colorId);

  const formik = useFormik({
    initialValues: {
      title: colorName.length > 0 ? colorName[0].title : "",
      hexa_id: colorName.length > 0 ? nameToHexa(colorName[0].title) : "",
    },
    validationSchema: colorSchema,
    onSubmit: (value) => {
      if (!rgbColor.startsWith("#")) {
        message.error("Select Valid Color!");
      } else {
        if (colorId != undefined) {
          const data = { _id: colorId, colorData: value };
          dispatch(updateAColor(data));
        } else {
          dispatch(createColor(value));
        }
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
          {`${colorId == undefined ? "Add " : "Update "}`}
          Color
        </button>
      </form>
    </div>
  );
};

export default ColorForm;
