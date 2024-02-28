import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import BrandForm from "../components/BrandForm";
import { resetMsgState } from "../features/brand/brandSlice";

const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrandState = useSelector((state) => state.brand);
  useEffect(() => {
    const { isSuccess, isError, createdBrand, updatedBrand } = newBrandState;
    if (isSuccess && createdBrand != "") {
      message.success("Brand Addedd Successfully!");
    }
    if (isSuccess && updatedBrand) {
      message.success("Brand Updated Successfully!");
      navigate("/admin/brand-list");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
    dispatch(resetMsgState());
  }, [newBrandState.isSuccess, newBrandState.isError]);

  return (
    <div>
      <h3 className="mb-4 title">
        {`${getBrandId == undefined ? "Add" : "Edit"}`} Brand
      </h3>
      <BrandForm brandId={getBrandId} />
    </div>
  );
};

export default Addbrand;
