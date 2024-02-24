import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";

import PCategoryForm from "../components/PCategoryForm";

const Addcat = () => {
  const newCatState = useSelector((state) => state.pCategory);
  useEffect(() => {
    const { isSuccess, isError, createdCategory } = newCatState;
    if (isSuccess && createdCategory != "") {
      message.success("Product Category Addedd!");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [newCatState.isSuccess, newCatState.isError]);

  return (
    <div>
      <h3 className="mb-4  title">Add Product Category</h3>
      <PCategoryForm />
    </div>
  );
};

export default Addcat;
