import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import BCategoryForm from "../components/BCategoryForm";

const Addblogcat = () => {
  const newCatState = useSelector((state) => state.bCategory);
  useEffect(() => {
    const { isSuccess, isError, createdCategory } = newCatState;
    if (isSuccess && createdCategory != "") {
      message.success("Blog Category Addedd!");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [newCatState.isSuccess, newCatState.isError]);

  return (
    <div>
      <h3 className="mb-4  title">Add Blog Category</h3>
      <BCategoryForm />
    </div>
  );
};

export default Addblogcat;
