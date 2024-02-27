import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import pcategorySchema from "../utils/schema/pcategorySchema";
import {
  resetState as catResetState,
  createCategory,
} from "../features/pcategory/pcategorySlice";
import RequiredInput from "./RequiredInput";

const PCategoryForm = () => {
  const dispatch = useDispatch();
  const newCatState = useSelector((state) => state.pCategory);

  useEffect(() => {
    const { isSuccess, isError, createdCategory } = newCatState;
    if (isSuccess && createdCategory != "") {
      formik.resetForm();
      setTimeout(() => {
        dispatch(catResetState());
      }, 100);
    }
    if (isError) {
      setTimeout(() => {
        dispatch(catResetState());
      }, 100);
    }
  }, [newCatState.isSuccess, newCatState.isError]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    schema: pcategorySchema,
    onSubmit: (value) => {
      dispatch(createCategory(value));
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
          Add Category
        </button>
      </form>
    </div>
  );
};

export default PCategoryForm;
