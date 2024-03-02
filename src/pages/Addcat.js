import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import PCategoryForm from "../components/PCategoryForm";
import { resetMsgState } from "../features/pcategory/pcategorySlice";

const Addcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCateroryId = location.pathname.split("/")[3];
  const newCatState = useSelector((state) => state.pCategory);
  useEffect(() => {
    const { isSuccess, isError, createdCategory, updatedCategory } =
      newCatState;
    if (isSuccess && createdCategory != "") {
      message.success("Product Category Addedd!");
    }
    if (isSuccess && updatedCategory != "") {
      message.success("Category Updated successfully!");
      navigate("/admin/category-list");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
    dispatch(resetMsgState());
  }, [newCatState.isSuccess, newCatState.isError]);

  return (
    <div>
      <h3 className="mb-4  title">
        {`${getCateroryId == undefined ? "Add " : "Edit "}`}
        Product Category
      </h3>
      <PCategoryForm categoryId={getCateroryId} />
    </div>
  );
};

export default Addcat;
