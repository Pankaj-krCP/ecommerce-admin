import React, { useEffect } from "react";
import BrandForm from "../components/BrandForm";
import { useSelector } from "react-redux";
import { message } from "antd";

const Addbrand = () => {
  const newBrandState = useSelector((state) => state.brand);
  useEffect(() => {
    const { isSuccess, isError, createdBrand } = newBrandState;
    if (isSuccess && createdBrand != "") {
      message.success("Brand Added successfully!");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [newBrandState.isSuccess, newBrandState.isError]);

  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <BrandForm />
    </div>
  );
};

export default Addbrand;
