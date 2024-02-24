import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetMsgState as imgMsgResetState } from "../features/upload/uploadSlice";

const useImgUploadMssg = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const imgState = useSelector((state) => state.upload);

  useEffect(() => {
    const { isSuccess, isError } = imgState;
    if (isSuccess && count < imgState.images.length) {
      message.success("Image uploaded successfully!");
      dispatch(imgMsgResetState());
    }
    if (isSuccess && count > imgState.images.length) {
      message.success("Image deleted successfully!");
      dispatch(imgMsgResetState());
    }
    if (isError) {
      message.error("Something Went Wrong");
      dispatch(imgMsgResetState());
    }
    setCount(imgState.images.length);
  }, [imgState.isSuccess, imgState.isError]);
};

export default useImgUploadMssg;
