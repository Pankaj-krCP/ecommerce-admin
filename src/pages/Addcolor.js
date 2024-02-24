import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import ColorForm from "../components/ColorForm";

const Addcolor = () => {
  const newColorState = useSelector((state) => state.color);
  useEffect(() => {
    const { isSuccess, isError, createdColor } = newColorState;
    if (isSuccess && createdColor != "") {
      message.success("Color Addedd!");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [newColorState.isSuccess, newColorState.isError]);
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <ColorForm />
    </div>
  );
};

export default Addcolor;
