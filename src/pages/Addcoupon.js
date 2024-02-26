import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import CouponForm from "../components/CouponForm";

const AddCoupon = () => {
  const newCouponState = useSelector((state) => state.coupon);

  useEffect(() => {
    const { isSuccess, isError, createdCoupon } = newCouponState;
    if (isSuccess && createdCoupon) {
      message.success("Coupon Added Successfullly!");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [newCouponState.isSuccess, newCouponState.isError]);

  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <CouponForm />
    </div>
  );
};

export default AddCoupon;
