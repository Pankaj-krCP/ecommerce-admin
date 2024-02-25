import { React, useEffect } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import BlogForm from "../components/BlogForm";

const Addblog = () => {
  const newBlogState = useSelector((state) => state.blog);

  useEffect(() => {
    const { isSuccess, isError, createdBlog } = newBlogState;
    if (isSuccess && createdBlog != "") {
      message.success("Blog Added successfully!");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [newBlogState.isSuccess, newBlogState.isError]);

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>
      <BlogForm />
    </div>
  );
};

export default Addblog;
