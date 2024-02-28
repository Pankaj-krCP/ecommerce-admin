import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import ColorForm from "../components/ColorForm";
import { resetMsgState } from "../features/color/colorSlice";

const Addcolor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];
  const newColorState = useSelector((state) => state.color);
  useEffect(() => {
    const { isSuccess, isError, createdColor, updatedColor } = newColorState;
    if (isSuccess && createdColor != "") {
      message.success("Color Addedd Successfully!");
    }
    if (isSuccess && updatedColor) {
      message.success("Color Updated Successfully!");
      navigate("/admin/color-list");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
    dispatch(resetMsgState());
  }, [newColorState.isSuccess, newColorState.isError]);

  return (
    <div>
      <h3 className="mb-4 title">
        {`${getColorId == undefined ? "Add" : "Edit"}`} Color
      </h3>
      <ColorForm colorId={getColorId} />
    </div>
  );
};

export default Addcolor;
