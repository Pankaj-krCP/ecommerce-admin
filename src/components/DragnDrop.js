import React from "react";
import Dropzone from "react-dropzone";
import { InboxOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import useImgUploadMssg from "../hooks/useImgUploadMssg";

const DragnDrop = () => {
  useImgUploadMssg();
  const dispatch = useDispatch();
  const imgState = useSelector((state) => state.upload);

  return (
    <>
      <div className="bg-light border rounded p-5 text-center">
        <Dropzone
          onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="cursor-pointer">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <InboxOutlined className="fs-3" />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>

      <div className="showimages d-flex flex-wrap gap-3">
        {imgState.images?.map((i, j) => {
          return (
            <div className="position-relative" key={j}>
              <button
                type="button"
                onClick={() => dispatch(delImg(i.public_id))}
                className="btn-close position-absolute"
                style={{ top: "10px", right: "10px" }}
              ></button>
              <img src={i.url} alt="" width={200} height={200} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DragnDrop;
