import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import RequiredInput from "./RequiredInput";
import couponSchema from "../utils/schema/couponSchema";
import {
  createCoupon,
  resetState as couponResetState,
} from "../features/coupon/couponSlice";

const CouponForm = () => {
  const dispatch = useDispatch();
  const newCouponState = useSelector((state) => state.coupon);

  useEffect(() => {
    const { isSuccess, isError, createdCoupon } = newCouponState;
    if (isSuccess && createdCoupon != "") {
      formik.resetForm();
      setTimeout(() => {
        dispatch(couponResetState());
      }, 100);
    }
    if (isError) {
      setTimeout(() => {
        dispatch(couponResetState());
      }, 100);
    }
  }, [newCouponState.isSuccess, newCouponState.isError]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: couponSchema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
        <RequiredInput formik={formik} type={"text"} name={"name"} />
        <RequiredInput formik={formik} type={"date"} name={"expiry"} />
        <RequiredInput formik={formik} type={"number"} name={"discount"} />
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default CouponForm;
