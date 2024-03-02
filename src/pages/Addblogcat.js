import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import BCategoryForm from "../components/BCategoryForm";
import { resetMsgState } from "../features/bcategory/bcategorySlice";

const Addblogcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCateroryId = location.pathname.split("/")[3];
  const newCatState = useSelector((state) => state.bCategory);
  useEffect(() => {
    const { isSuccess, isError, createdCategory, updatedCategory } =
      newCatState;
    if (isSuccess && createdCategory != "") {
      message.success("Blog Category Addedd!");
    }
    if (isSuccess && updatedCategory != "") {
      message.success("Category Updated Successfully!");
      navigate("/admin/blog-category-list");
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
        Blog Category
      </h3>
      <BCategoryForm categoryId={getCateroryId} />
    </div>
  );
};

export default Addblogcat;
