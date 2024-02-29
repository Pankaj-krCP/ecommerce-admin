import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CouponForm from "../components/CouponForm";
import { resetMsgState } from "../features/coupon/couponSlice";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];
  const newCouponState = useSelector((state) => state.coupon);

  useEffect(() => {
    const { isSuccess, isError, createdCoupon, updatedCoupon } = newCouponState;
    if (isSuccess && createdCoupon) {
      message.success("Coupon Added Successfullly!");
    }
    if (isSuccess && updatedCoupon) {
      message.success("Coupon Updated Successfully!");
      navigate("/admin/coupon-list");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
    dispatch(resetMsgState());
  }, [newCouponState.isSuccess, newCouponState.isError]);

  return (
    <div>
      <h3 className="mb-4 title">
        {`${getCouponId == undefined ? "Add " : "Edit "}`} Coupon
      </h3>
      <CouponForm couponId={getCouponId} />
    </div>
  );
};

export default AddCoupon;
