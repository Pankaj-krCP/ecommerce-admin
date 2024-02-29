import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import RequiredInput from "./RequiredInput";
import couponSchema from "../utils/schema/couponSchema";
import {
  createCoupon,
  resetMsgState,
  updateACoupon,
} from "../features/coupon/couponSlice";

const CouponForm = ({ couponId }) => {
  const dispatch = useDispatch();
  const newCouponState = useSelector((state) => state.coupon);

  useEffect(() => {
    const { isSuccess, isError, createdCoupon, updatedCoupon } = newCouponState;
    if (
      (isSuccess && createdCoupon != "") ||
      (isSuccess && updatedCoupon != "")
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
  }, [newCouponState.isSuccess, newCouponState.isError]);

  const couponName = newCouponState.coupons.filter(
    (ele) => ele._id == couponId
  );

  const formik = useFormik({
    initialValues: {
      name: couponName.length > 0 ? couponName[0].name : "",
      expiry:
        couponName.length > 0
          ? new Date(couponName[0].expiry).toISOString().substring(0, 10)
          : "",
      discount: couponName.length > 0 ? couponName[0].discount : "",
    },
    validationSchema: couponSchema,
    onSubmit: (value) => {
      if (couponId != undefined) {
        const data = { _id: couponId, couponData: value };
        dispatch(updateACoupon(data));
      } else {
        dispatch(createCoupon(value));
      }
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
          {`${couponId == undefined ? "Add " : "Update "}`} Coupon
        </button>
      </form>
    </div>
  );
};

export default CouponForm;
