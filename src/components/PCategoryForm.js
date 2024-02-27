import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import pcategorySchema from "../utils/schema/pcategorySchema";
import RequiredInput from "./RequiredInput";
import {
  createCategory,
  resetMsgState,
  updateACategory,
} from "../features/pcategory/pcategorySlice";

const PCategoryForm = ({ categoryId }) => {
  const dispatch = useDispatch();
  const newCatState = useSelector((state) => state.pCategory);

  useEffect(() => {
    const { isSuccess, isError, createdCategory, updatedCategory } =
      newCatState;
    if (
      (isSuccess && createdCategory != "") ||
      (isSuccess && updatedCategory != "")
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
  }, [newCatState.isSuccess, newCatState.isError]);

  const categoryName = newCatState.pCategories.filter(
    (ele) => ele._id == categoryId
  );

  const formik = useFormik({
    initialValues: {
      title: categoryName.length > 0 ? categoryName[0].title : "",
    },
    schema: pcategorySchema,
    onSubmit: (value) => {
      if (categoryId != undefined) {
        const data = { _id: categoryId, categoryData: value };
        dispatch(updateACategory(data));
      } else {
        dispatch(createCategory(value));
      }
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
          {`${categoryId == undefined ? "Add Category" : "Update Category"}`}
        </button>
      </form>
    </div>
  );
};

export default PCategoryForm;
