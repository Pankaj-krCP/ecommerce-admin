import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import RequiredInput from "./RequiredInput";
import RequiredSelect from "./RequiredSelect";
import DragnDrop from "./DragnDrop";
import DescriptionInput from "./DescriptionInput";
import blogSchema from "../utils/schema/blogSchema";
import { getCategories } from "../features/bcategory/bcategorySlice";
import { resetState, restoreImages } from "../features/upload/uploadSlice";
import {
  createBlog,
  resetMsgState,
  updateABlog,
} from "../features/blogs/blogSlice";

const BlogForm = ({ blogId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const catState = useSelector((state) => state.bCategory.bCategories);
  const imgState = useSelector((state) => state.upload);
  const newBlogState = useSelector((state) => state.blog);

  useEffect(() => {
    const { isSuccess, isError, createdBlog, updatedBlog } = newBlogState;
    if ((isSuccess && createdBlog != "") || (isSuccess && updatedBlog != "")) {
      formik.resetForm();
      dispatch(resetState());
      setTimeout(() => {
        dispatch(resetMsgState());
      }, 100);
    }
    if (isError) {
      setTimeout(() => {
        dispatch(resetMsgState());
      }, 100);
    }
  }, [newBlogState.isSuccess, newBlogState.isError]);

  const blogName = newBlogState.blogs.filter((ele) => ele._id == blogId);

  useEffect(() => {
    setTimeout(() => {
      if (blogName.length > 0) {
        dispatch(restoreImages(blogName[0].images));
      }
    }, 100);
  }, []);

  useEffect(() => {
    formik.values.images = imgState.images;
  }, [imgState.isSuccess]);

  const formik = useFormik({
    initialValues: {
      title: blogName.length > 0 ? blogName[0]?.title : "",
      description: blogName.length > 0 ? blogName[0]?.description : "",
      category: blogName.length > 0 ? blogName[0]?.category : "",
      images: blogName.length > 0 ? blogName[0]?.images : "",
    },
    validationSchema: blogSchema,
    onSubmit: (values) => {
      if (blogId != undefined) {
        const data = { _id: blogId, blogData: values };
        dispatch(updateABlog(data));
      } else {
        dispatch(createBlog(values));
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
        <RequiredInput formik={formik} type={"text"} name={"title"} />
        <RequiredSelect formik={formik} name={"category"} object={catState} />
        <DescriptionInput formik={formik} />
        <DragnDrop />
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {`${blogId == undefined ? "Add " : "Update "}`} Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
