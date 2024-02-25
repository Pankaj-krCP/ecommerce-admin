import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import RequiredInput from "./RequiredInput";
import RequiredSelect from "./RequiredSelect";
import DragnDrop from "./DragnDrop";
import DescriptionInput from "./DescriptionInput";
import blogSchema from "../utils/schema/blogSchema";
import { getCategories } from "../features/bcategory/bcategorySlice";
import { resetState as imgResetState } from "../features/upload/uploadSlice";
import {
  createBlog,
  resetState as blogResetState,
} from "../features/blogs/blogSlice";

const BlogForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const catState = useSelector((state) => state.bCategory.bCategories);
  const imgState = useSelector((state) => state.upload);
  const newBlogState = useSelector((state) => state.blog);

  useEffect(() => {
    const { isSuccess, isError, createdBlog } = newBlogState;
    if (isSuccess && createdBlog != "") {
      formik.resetForm();
      dispatch(imgResetState());
      setTimeout(() => {
        dispatch(blogResetState());
      }, 100);
    }
    if (isError) {
      setTimeout(() => {
        dispatch(blogResetState());
      }, 100);
    }
  }, [newBlogState.isSuccess, newBlogState.isError]);

  useEffect(() => {
    formik.values.images = imgState.images;
  }, [imgState.isSuccess]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: blogSchema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
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
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
