import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import brandSchema from "../utils/schema/brandSchema";
import RequiredInput from "./RequiredInput";
import {
  createBrand,
  resetMsgState,
  updateABrand,
} from "../features/brand/brandSlice";

const BrandForm = ({ brandId }) => {
  const dispatch = useDispatch();

  const newBrandState = useSelector((state) => state.brand);

  useEffect(() => {
    const { isSuccess, isError, createdBrand, updatedBrand } = newBrandState;
    if (
      (isSuccess && createdBrand != "") ||
      (isSuccess && updatedBrand != "")
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
  }, [newBrandState.isSuccess, newBrandState.isError]);

  const brandName = newBrandState.brands.filter((ele) => ele._id == brandId);

  const formik = useFormik({
    initialValues: {
      title: brandName.length > 0 ? brandName[0].title : "",
    },
    validationSchema: brandSchema,
    onSubmit: (value) => {
      if (brandId != undefined) {
        const data = { _id: brandId, brandData: value };
        dispatch(updateABrand(data));
      } else {
        dispatch(createBrand(value));
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
          {`${brandId == undefined ? "Add Brand" : "Update Brand"}`}
        </button>
      </form>
    </div>
  );
};

export default BrandForm;
