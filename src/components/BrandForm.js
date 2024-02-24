import React, { useEffect } from "react";
import { useFormik } from "formik";
import brandSchema from "../utils/schema/brandSchema";
import RequiredInput from "./RequiredInput";
import { useDispatch, useSelector } from "react-redux";
import { createBrands } from "../features/brand/brandSlice";
import { resetState as brandResetState } from "../features/brand/brandSlice";

const BrandForm = () => {
  const dispatch = useDispatch();

  const newBrandState = useSelector((state) => state.brand);

  useEffect(() => {
    const { isSuccess, createdBrand } = newBrandState;
    if (isSuccess && createdBrand !== "") {
      formik.resetForm();
    }
    setTimeout(() => {
      dispatch(brandResetState());
    }, 100);
  }, [newBrandState.isSuccess, newBrandState.isError]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: brandSchema,
    onSubmit: (value) => {
      dispatch(createBrands(value));
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
          Add Brand
        </button>
      </form>
    </div>
  );
};

export default BrandForm;
